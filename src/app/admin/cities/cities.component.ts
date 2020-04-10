import {Component, OnInit} from '@angular/core';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {RegionService} from '../../services/region.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.less']
})
export class CitiesComponent implements OnInit {
  public p: number;
  public cities: City[];
  public regions: Region[];

  constructor(private cityService: CityService,
              private regionService: RegionService) {
  }

  ngOnInit(): void {
    this.regionService.getRegions().subscribe(regions => {
      this.regions = regions;
    });
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  public removeCity(removedCityId: any) {
    this.cities = this.cities.filter(city => {
      return city.id !== removedCityId;
    });
  }
}
