import {Component, OnInit} from '@angular/core';
import {CountryService} from '../../services/country.service';
import {Country} from '../../models/country';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.less']
})
export class CountriesComponent implements OnInit {

  public countries: Country[];
  public p: number;

  constructor(private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

}
