import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Region} from '../../models/region';
import {Country} from '../../models/country';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.less']
})
export class RegionComponent implements OnInit, OnChanges {

  @Input() region: Region;
  @Input() countries: Country[];

  public country: Country;

  constructor(@Inject(LOCALE_ID) public locale: string) {
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

  }

  public removeItem() {

  }
}
