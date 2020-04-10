import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Institution} from '../../models/institution';
import {City} from '../../models/city';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {InstitutionService} from '../../services/institution.service';
import {Subscription} from 'rxjs';
import {RemoveDialogComponent} from '../modals/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.less']
})
export class InstitutionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public institution: Institution;
  @Input() public cities: City[];
  @Output() public removed = new EventEmitter();

  public city: City;
  private subscription = new Subscription();

  constructor(@Inject(LOCALE_ID) public locale: string,
              private updateDialog: MatDialog,
              private removeDialog: MatDialog,
              private institutionService: InstitutionService) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.institution.currentValue) {
      this.institution = changes.institution.currentValue;
    }

    if (changes.cities.currentValue) {
      this.cities = changes.cities.currentValue;
      this.city = this.cities.find(city => {
        return city.id === this.institution.cityId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.institution,
      parentItem: this.cities,
      parentId: 'cityId',
    };
    const dialog = this.updateDialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: dialogData
      }
    });

    const updateSubscription = dialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.institutionService.updateInstitution(+this.institution.id, data).subscribe(institution => {
        this.institution = institution;
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
      this.institutionService.removeInstitution(+this.institution.id).subscribe(() => {
        this.removed.emit(+this.institution.id);
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
