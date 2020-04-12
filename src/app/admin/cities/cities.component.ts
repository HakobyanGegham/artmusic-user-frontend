import {Component, OnDestroy, OnInit} from '@angular/core';
import {CityService} from '../../services/city.service';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {RegionService} from '../../services/region.service';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.less']
})
export class CitiesComponent implements OnInit, OnDestroy {
  public p: number;
  public cities: City[];
  public regions: Region[];
  public subscription = new Subscription();

  constructor(private cityService: CityService,
              private dialog: MatDialog,
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

  public addCity() {
    const addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: {
          parentItem: this.regions,
          parentId: 'countryId'
        }
      }
    });

    this.subscription = addDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.cityService.addCity(data).subscribe(city => {
        this.cities.push(city);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
