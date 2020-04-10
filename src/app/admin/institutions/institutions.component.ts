import {Component, OnInit} from '@angular/core';
import {Institution} from '../../models/institution';
import {InstitutionService} from '../../services/institution.service';
import {City} from '../../models/city';
import {CityService} from '../../services/city.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.less']
})
export class InstitutionsComponent implements OnInit {
  public p: number;
  public institutions: Institution[];
  public cities: City[];

  constructor(private institutionService: InstitutionService,
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
}
