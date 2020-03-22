import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import FormHelper from '../../helpers/form-helper';
import {ApplicationService} from '../../services/application.service';
import {Country} from '../../models/country';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.less']
})
export class ApplicationFormComponent extends FormHelper implements OnInit {

  public countries: Country[];

  constructor(private formBuilder: FormBuilder,
              private applicationService: ApplicationService) {
    super();
  }

  ngOnInit(): void {
    this.applicationService.getCountries().subscribe(countries => {
      this.countries = countries;
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

  public submit(value: any) {
    this.formSubmitAttempt = true;
    if (this.form.valid) {

    } else {
      this.validateAllFormFields(this.form);
    }
  }

}
