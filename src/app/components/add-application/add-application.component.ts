import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApplicantFormComponent} from '../applicant-form/applicant-form.component';
import {ApplicationFormComponent} from '../application-form/application-form.component';
import {ApplicationProgramFormComponent} from '../application-program-form/application-program-form.component';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.less']
})
export class AddApplicationComponent implements OnInit {

  @ViewChild(ApplicantFormComponent) applicantFormComponent: ApplicantFormComponent;
  @ViewChild(ApplicationFormComponent) applicationFormComponent: ApplicationFormComponent;
  @ViewChildren(ApplicationProgramFormComponent) applicationProgramFormComponents: ApplicationProgramFormComponent[];

  constructor(private cookieService: CookieService,
              private router: Router,
              private applicationService: ApplicationService) {
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
    const applicant = this.applicantFormComponent.submit();
    const application = this.applicationFormComponent.submit();
    const applicationPrograms = [];
    this.applicationProgramFormComponents.forEach(applicationProgram => {
      applicationPrograms.push(applicationProgram.submit());
    });

    this.checkFormValues(applicationPrograms, applicant, application).then(() => {
      this.applicationService.addApplication({applicant, application, applicationPrograms}).subscribe(applicationForm => {
        console.log(applicationForm);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  private checkFormValues(applicationPrograms: any[], applicant: any, application: any) {
    return new Promise((resolve, reject) => {
      const falseValue = applicationPrograms.find(value => {
        return value === false;
      });
      if (falseValue !== undefined || applicant === false || application === false) {
        reject();
      } else {
        resolve();
      }
    });
  }
}
