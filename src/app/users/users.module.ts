import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';

import {UsersRoutingModule} from './users-routing.module';
import {FestivalContentComponent} from './festival-content/festival-content.component';
import {ApplicationsComponent} from './applications/applications.component';
import {ApplicationItemComponent} from './application-item/application-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ApplicantsComponent} from './applicants/applicants.component';
import {ApplicantItemComponent} from './applicant-item/applicant-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [FestivalContentComponent, ApplicationsComponent, ApplicationItemComponent, ApplicantsComponent, ApplicantItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class UsersModule {
}
