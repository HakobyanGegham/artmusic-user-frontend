import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {ApplicationService} from '../../services/application.service';
import {Country} from '../../models/country';
import {City} from '../../models/city';
import {Region} from '../../models/region';
import {EducationalInstitution} from '../../models/educational-institution';
import {Nomination} from '../../models/nomination';
import {Specialization} from '../../models/specialization';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {CountryService} from '../../services/country.service';
import {RegionService} from '../../services/region.service';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.less']
})
export class ApplicationFormComponent extends FormHelper implements OnInit {

  public countries: Country[];
  public regions: Region[];
  public cities: City[];
  public educationalInstitutions: EducationalInstitution[];
  public nominations: Nomination[];
  public specializations: Specialization[];

  constructor(private formBuilder: FormBuilder,
              private applicationService: ApplicationService,
              private countryService: CountryService,
              private regionService: RegionService) {
    super();
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
    this.applicationService.getNominations().subscribe(nominations => {
      this.nominations = nominations;
    });
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      country: ['', [Validators.required]],
      region: ['', [Validators.required]],
      city: ['', [Validators.required]],
      educationalInstitution: ['', [Validators.required]],
      nomination: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      directorFirstName: ['', [Validators.required, Validators.minLength(3)]],
      directorLastName: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public submit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      return this.form.value;
    } else {
      this.validateAllFormFields(this.form);
    }
  }


  public regionChange(value: any) {
    this.applicationService.getCities(+value).subscribe(cities => {
      this.cities = cities;
    });
  }

  public cityChange(value: any) {
    this.applicationService.getEducationalInstitutions(+value).subscribe(educationalInstitutions => {
      this.educationalInstitutions = educationalInstitutions;
    });
  }

  public nominationChange(value: any) {
    this.applicationService.getSpecializations(+value).subscribe(specializations => {
      this.specializations = specializations;
    });
  }

  public countryChange(event: MatAutocompleteSelectedEvent) {
    const id = event.option._getHostElement().getAttribute('data-id');
    this.regionService.getRegions(+id).subscribe(regions => {
      this.regions = regions;
    });
  }

  public addCountry(event: MouseEvent, countryInput: HTMLInputElement) {
    event.stopPropagation();
    event.preventDefault();
    if (countryInput.value.trim() !== '') {
      this.countryService.addCountry(countryInput.value).subscribe(country => {
        this.countries.push(country);
      });
    }
  }

  public addRegion(event: MouseEvent, regionInput: HTMLInputElement, value: any) {
    event.stopPropagation();
    event.preventDefault();
    if (regionInput.value.trim() !== '') {
      this.regionService.addRegions(regionInput.value, +value).subscribe(region => {
        this.regions.push(region);
      });
    }
  }
}
