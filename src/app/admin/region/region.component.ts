import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Region} from '../../models/region';
import {Country} from '../../models/country';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RegionService} from '../../services/region.service';
import {Subscription} from 'rxjs';
import {RemoveDialogComponent} from '../modals/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.less']
})
export class RegionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() region: Region;
  @Input() countries: Country[];
  @Output() removed = new EventEmitter();

  public country: Country;
  private subscription = new Subscription();

  constructor(@Inject(LOCALE_ID) public locale: string,
              private updateDialog: MatDialog,
              private removeDialog: MatDialog,
              private regionService: RegionService) {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.region.currentValue) {
      this.region = changes.region.currentValue;
    }

    if (changes.countries.currentValue) {
      this.countries = changes.countries.currentValue;
      this.country = this.countries.find(country => {
        return country.id === this.region.countryId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.region,
      parentItem: this.countries,
      parentId: 'countryId'
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
      this.regionService.updateRegion(+this.region.id, data).subscribe(region => {
        this.region = region;
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
      this.regionService.removeRegion(+this.region.id).subscribe(() => {
        this.removed.emit(+this.region.id);
      });
    });

    this.subscription.add(removeSubscription);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
