import {Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Country} from '../../models/country';
import {MatDialog} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {CountryService} from '../../services/country.service';
import {Subscription} from 'rxjs';
import {RemoveDialogComponent} from '../modals/remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.less']
})
export class CountryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public country: Country;
  @Output() public removed = new EventEmitter();
  private subscription = new Subscription();

  constructor(@Inject(LOCALE_ID) public locale: string,
              private updateDialog: MatDialog,
              private removeDialog: MatDialog,
              private countryService: CountryService) {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.country.currentValue) {
      this.country = changes.country.currentValue;
    }
  }

  public removeItem() {
    const removeDialog = this.removeDialog.open(RemoveDialogComponent, {
      width: '350px',
      height: '200px',
    });

    const removeSubscription = removeDialog.componentInstance.remove.subscribe(() => {
      this.countryService.removeCountry(+this.country.id).subscribe(() => {
        this.removed.emit(+this.country.id);
      });
    });

    this.subscription.add(removeSubscription);
  }

  public openDialog() {
    const updateDialog = this.updateDialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '300px',
      data: {
        dataKey: {item: this.country}
      }
    });

    const updateSubscription = updateDialog.componentInstance.OnSubmitClick.subscribe(value => {
      this.countryService.updateCountry(+this.country.id, value.names).subscribe(country => {
        this.country = country;
      });
    });

    this.subscription.add(updateSubscription);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
