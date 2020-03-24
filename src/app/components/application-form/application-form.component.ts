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
              private applicationService: ApplicationService) {
    super();
  }

  ngOnInit(): void {
    this.applicationService.getCountries().subscribe(countries => {
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

  public countryChange(value: any) {
    this.applicationService.getRegions(+value).subscribe(regions => {
      this.regions = regions;
    });
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
}
