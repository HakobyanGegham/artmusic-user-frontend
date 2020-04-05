import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Country} from '../../models/country';
import {MatDialog} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {CountryService} from '../../services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.less']
})
export class CountryComponent implements OnInit, OnChanges {

  @Input() public country: Country;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog,
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

  }

  public openDialog() {
    const dialog = this.dialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '300px',
      data: {
        dataKey: this.country
      }
    });

    dialog.componentInstance.OnSubmitClick.subscribe(value => {
      this.countryService.updateCountry(+this.country.id, value.names).subscribe(country => {
        this.country = country;
      });
    });
  }
}
