import {Component, OnDestroy, OnInit} from '@angular/core';
import {Region} from '../../models/region';
import {RegionService} from '../../services/region.service';
import {Country} from '../../models/country';
import {CountryService} from '../../services/country.service';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.less']
})
export class RegionsComponent implements OnInit, OnDestroy {

  public regions: Region[];
  public countries: Country[];
  public p: number;
  private subscription = new Subscription();

  constructor(private regionService: RegionService,
              private dialog: MatDialog,
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

  public removeRegion(removedRegionId: any) {
    this.regions = this.regions.filter(region => {
      return region.id !== removedRegionId;
    });
  }

  public addRegion() {
    const addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: {
          parentItem: this.countries,
          placeholder: 'Country'
        }
      }
    });

    this.subscription = addDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.regionService.addRegion(data).subscribe(region => {
        this.regions.push(region);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
