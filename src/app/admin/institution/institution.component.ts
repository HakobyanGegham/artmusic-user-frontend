import {Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Institution} from '../../models/institution';
import {City} from '../../models/city';
import {UpdateDialogComponent} from '../modals/update-dialog/update-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {InstitutionService} from '../../services/institution.service';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.less']
})
export class InstitutionComponent implements OnInit, OnChanges {

  @Input() public institution: Institution;
  @Input() public cities: City[];
  public city: City;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private dialog: MatDialog,
              private institutionService: InstitutionService) {
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.institution.currentValue) {
      this.institution = changes.institution.currentValue;
    }

    if (changes.cities.currentValue) {
      this.cities = changes.cities.currentValue;
      this.city = this.cities.find(city => {
        return city.id === this.institution.cityId;
      });
    }
  }

  public openDialog() {
    const dialogData = {
      item: this.institution,
      parentItem: this.cities,
      parentId: 'cityId',
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
      this.institutionService.updateInstitution(+this.institution.id, data).subscribe(institution => {
        this.institution = institution;
      });
    });
  }

  public removeItem() {

  }
}
