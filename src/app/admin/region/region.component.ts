import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Region} from '../../models/region';
import {Country} from '../../models/country';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RegionService} from '../../services/region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.less']
})
export class RegionComponent implements OnInit, OnChanges {

  @Input() region: Region;
  @Input() countries: Country[];

  public country: Country;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog,
              private regionService: RegionService) {
  }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.region.currentValue) {
      this.region = changes.region.currentValue;
    }

    if (changes.countries.currentValue) {
      this.countries = changes.countries.currentValue;
      this.country = this.countries.find(country => {
        return country.id === this.region.countryId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.region,
      parentItem: this.countries,
      parentId: 'countryId'
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
      this.regionService.updateRegion(+this.region.id, data).subscribe(region => {
        this.region = region;
      });
    });
  }

  public removeItem() {

  }
}
