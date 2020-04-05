import {Component, OnInit} from '@angular/core';
import {Region} from '../../models/region';
import {RegionService} from '../../services/region.service';
import {Country} from '../../models/country';
import {CountryService} from '../../services/country.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.less']
})
export class RegionsComponent implements OnInit {

  public regions: Region[];
  public countries: Country[];
  public p: number;

  constructor(private regionService: RegionService,
              private countryService: CountryService) {
  }

  public ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.regionService.getRegions().subscribe(regions => {
      this.regions = regions;
    });
  }
}
