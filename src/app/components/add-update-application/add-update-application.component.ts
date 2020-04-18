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

  public submitBtnClicked() {
    const applicant = this.applicantFormComponent.submit();
    const application = this.applicationFormComponent.submit();
    const applicationPrograms = [];
    this.applicationProgramFormComponents.forEach((applicationProgram, key) => {
      const program = applicationProgram.submit() as ApplicationProgram;
      if (program) {
        program.upload = this.applicantFormComponent.getUpload(key + 1);
      }
      applicationPrograms.push(program);
    });

    this.checkFormValues(applicationPrograms, applicant, application).then(() => {
      this.applicationService.addUpdateApplication({applicant, application, applicationPrograms}).subscribe(applicationForm => {
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
