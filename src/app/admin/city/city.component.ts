import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {MatDialog} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {CityService} from '../../services/city.service';
import {RemoveDialogComponent} from '../modals/remove-dialog/remove-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less']
})
export class CityComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public city: City;
  @Input() public regions: Region[];
  @Output() public removed = new EventEmitter();

  public region: Region;
  public subscription: Subscription;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private updateDialog: MatDialog,
              private removeDialog: MatDialog,
              private cityService: CityService) {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.city.currentValue) {
      this.city = changes.city.currentValue;
    }

    if (changes.regions.currentValue) {
      this.regions = changes.regions.currentValue;
      this.region = this.regions.find(region => {
        return region.id === this.city.regionId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.city,
      parentItem: this.regions,
      parentId: 'regionId',
    };
    const updateDialog = this.updateDialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: dialogData
      }
    });

    const updateSubscription = updateDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.cityService.updateCity(+this.city.id, data).subscribe(city => {
        this.city = city;
      });
    });

    this.subscription.add(updateSubscription);
  }

  public removeItem() {
    const removeDialog = this.removeDialog.open(RemoveDialogComponent, {
      width: '350px',
      height: '200px',
    });

    const removeSubscription = removeDialog.componentInstance.remove.subscribe(() => {
      this.cityService.removeCity(+this.city.id).subscribe(() => {
        this.removed.emit(+this.city.id);
      });
    });

    this.subscription.add(removeSubscription);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
