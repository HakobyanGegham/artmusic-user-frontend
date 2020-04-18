import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicantFormComponent} from '../applicant-form/applicant-form.component';
import {ApplicationFormComponent} from '../application-form/application-form.component';
import {ApplicationProgramFormComponent} from '../application-program-form/application-program-form.component';
import {ApplicationService} from '../../services/application.service';
import {ApplicationAddConfirmDialogComponent} from '../modals/application-add-confirm-dialog/application-add-confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Application} from '../../models/application';
import {ApplicationProgram} from '../../models/application-program';
import {Applicant} from '../../models/applicant';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-update-application.component.html',
  styleUrls: ['./add-update-application.component.less']
})
export class AddUpdateApplicationComponent implements OnInit {

  public application: Application;

  @ViewChild(ApplicantFormComponent) applicantFormComponent: ApplicantFormComponent;
  @ViewChild(ApplicationFormComponent) applicationFormComponent: ApplicationFormComponent;
  @ViewChildren(ApplicationProgramFormComponent) applicationProgramFormComponents: ApplicationProgramFormComponent[];

  constructor(private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute,
              private applicationService: ApplicationService,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('applicationId');
    if (id) {
      this.applicationService.getApplication(+id).subscribe(application => {
        this.application = application;
      });
    }
  }

  public audioUploaded(event: any) {
    this.applicationProgramFormComponents.forEach((program, key) => {
      if (key === event.key) {
        program.audioUploaded(event.uploadInput);
      }
    });
  }

  public submitBtnClicked() {
    const applicant = this.applicantFormComponent.submit() as Applicant;
    const application = this.applicationFormComponent.submit();
    const applicationPrograms = [];
    this.applicationProgramFormComponents.forEach((applicationProgram, key) => {
      applicationPrograms.push(applicationProgram.submit());
    });

    this.checkFormValues(applicationPrograms, applicant, application).then(() => {
      const formData = new FormData();
      formData.append('passportCopy',  applicant.passportCopy);
      formData.append('profileImage',  applicant.profileImage);
      formData.append('applicant',  JSON.stringify(applicant));
      formData.append('application',  JSON.stringify(application));
      formData.append('applicationPrograms',  JSON.stringify(applicationPrograms));
      applicationPrograms.forEach((program, key) => {
        formData.append(`upload${key + 1}`, program.upload);
      });

      this.applicationService.addUpdateApplication(formData).subscribe(applicationForm => {
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
    this.dialog.open(ApplicationAddConfirmDialogComponent, {
      width: '400px',
    });
  }
}
