import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApplicantFormComponent} from '../applicant-form/applicant-form.component';
import {ApplicationFormComponent} from '../application-form/application-form.component';
import {ApplicationProgramFormComponent} from '../application-program-form/application-program-form.component';
import {ApplicationService} from '../../services/application.service';
import {ApplicationAddConfirmDialogComponent} from '../modals/application-add-confirm-dialog/application-add-confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
              private applicationService: ApplicationService,
              private dialog: MatDialog) {
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
        this.showConfirmDialog();
      });
    }).catch(error => {
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

  private showConfirmDialog() {
    const dialogRef = this.dialog.open(ApplicationAddConfirmDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('add-application');
    });
  }
}
