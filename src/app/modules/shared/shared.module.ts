import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {LeftPanelComponent} from '../../components/left-panel/left-panel.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {UploadPercentageDirective} from '../../directives/upload-percentage.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RouterModule} from '@angular/router';
import {ErrorDialogComponent} from '../../components/modals/error-dialog/error-dialog.component';
import {ApplicationsComponent} from '../../festivals/applications/applications.component';
import {ApplicationItemComponent} from '../../festivals/application-item/application-item.component';
import {ApplicantsComponent} from '../../festivals/applicants/applicants.component';
import {ApplicantItemComponent} from '../../festivals/applicant-item/applicant-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SuccessDialogComponent} from '../../components/modals/success-dialog/success-dialog.component';
import {FilterFormComponent} from '../../components/filter-form/filter-form.component';

@NgModule({
  declarations: [
    LeftPanelComponent,
    UploadPercentageDirective,
    ErrorDialogComponent,
    SuccessDialogComponent,
    ApplicationsComponent,
    ApplicationItemComponent,
    ApplicantsComponent,
    ApplicantItemComponent,
    FilterFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    NgxPaginationModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    LeftPanelComponent,
    UploadPercentageDirective,
    ErrorDialogComponent,
    ApplicationsComponent,
    ApplicationItemComponent,
    ApplicantsComponent,
    ApplicantItemComponent,
    SuccessDialogComponent,
    FilterFormComponent
  ],
})
export class SharedModule {
}
