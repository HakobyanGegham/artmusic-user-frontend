import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {MatDialog} from '@angular/material/dialog';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {CityService} from '../../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less']
})
export class CityComponent implements OnInit, OnChanges {

  @Input() public city: City;
  @Input() public regions: Region[];

  public region: Region;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog,
              private cityService: CityService) {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.city.currentValue) {
      this.city = changes.city.currentValue;
    }

    if (changes.regions.currentValue) {
      this.regions = changes.regions.currentValue;
      this.region = this.regions.find(region => {
        return region.id === this.city.regionId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.city,
      parentItem: this.regions,
      parentId: 'regionId',
    };
    const dialog = this.dialog.open(UpdateDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: dialogData
      }
    });

    dialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.cityService.updateCity(+this.city.id, data).subscribe(city => {
        this.city = city;
      });
    });
  }

  public removeItem() {

  }
}
