import {Component, OnInit, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApplicantFormComponent} from '../applicant-form/applicant-form.component';
import {ApplicationFormComponent} from '../application-form/application-form.component';
import {ApplicationForm} from '../../models/application-form';
import {ApplicationProgramFormComponent} from '../application-program-form/application-program-form.component';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.less']
})
export class AddApplicationComponent implements OnInit {

  @ViewChild(ApplicantFormComponent) applicantFormComponent: ApplicantFormComponent;
  @ViewChild(ApplicationFormComponent) applicationFormComponent: ApplicationFormComponent;
  @ViewChild(ApplicationProgramFormComponent) applicationProgramFormComponent: ApplicationProgramFormComponent;

  constructor(private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.redirect();
  }

  private redirect() {
    const token = this.cookieService.get('token');

    if (!token) {
      this.router.navigateByUrl('login');
    }
  }

  public submitBtnClicked() {
    const formValues = [];

    formValues.push(this.applicantFormComponent.submit());
    formValues.push(this.applicationFormComponent.submit());
    formValues.push(this.applicationProgramFormComponent.submit());

    console.log(formValues);
  }
}
