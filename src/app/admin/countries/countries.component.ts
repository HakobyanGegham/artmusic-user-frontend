import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountryService} from '../../services/country.service';
import {Country} from '../../models/country';
import {MatDialog} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {Subscription} from 'rxjs';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.less']
})
export class CountriesComponent implements OnInit, OnDestroy {

  public countries: Country[];
  public p: number;
  private subscription = new Subscription();

  constructor(private countryService: CountryService,
              private addDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  public removeCountry(removedCountyId: any) {
    this.countries = this.countries.filter(country => {
      return country.id !== removedCountyId;
    });
  }

  public addCountry() {
    const addDialog = this.addDialog.open(AddDialogComponent, {
      width: '450px',
      height: '300px',
      data: {
        dataKey: {}
      }
    });

    this.subscription = addDialog.componentInstance.OnSubmitClick.subscribe(value => {
      this.countryService.addCountry(value.names).subscribe(country => {
        this.countries.push(country);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
