import {Component, OnDestroy, OnInit} from '@angular/core';
import {Institution} from '../../models/institution';
import {InstitutionService} from '../../services/institution.service';
import {City} from '../../models/city';
import {CityService} from '../../services/city.service';
import {AddDialogComponent} from '../modals/add-dialog/add-dialog.component';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.less']
})
export class InstitutionsComponent implements OnInit, OnDestroy {
  public p: number;
  public institutions: Institution[];
  public cities: City[];
  private subscription = new Subscription();

  constructor(private institutionService: InstitutionService,
              private dialog: MatDialog,
              private cityService: CityService) {
  }

  public ngOnInit(): void {
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    });
    this.institutionService.getInstitutions().subscribe(institutions => {
      this.institutions = institutions;
    });
  }

  public removeInstitution(removedInstitutionId: any) {
    this.cities = this.cities.filter(city => {
      return city.id !== removedInstitutionId;
    });
  }

  public addInstitution() {
    const addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      height: '360px',
      data: {
        dataKey: {
          parentItem: this.cities,
        }
      }
    });

    this.subscription = addDialog.componentInstance.OnSubmitClick.subscribe((value) => {
      const data = {
        parentItem: value.parentItem,
        names: value.names,
      };
      this.institutionService.addInstitution(data).subscribe(institution => {
        this.institutions.push(institution);
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
