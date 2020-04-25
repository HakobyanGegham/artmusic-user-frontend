import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';

import {UsersRoutingModule} from './users-routing.module';
import {FestivalContentComponent} from '../users/festival-content/festival-content.component';
import {ApplicationsComponent} from '../users/applications/applications.component';
import {ApplicationItemComponent} from '../users/application-item/application-item.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ApplicantsComponent} from '../users/applicants/applicants.component';
import {ApplicantItemComponent} from '../users/applicant-item/applicant-item.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    FestivalContentComponent,
    ApplicationsComponent,
    ApplicationItemComponent,
    ApplicantsComponent,
    ApplicantItemComponent
  ],
  imports: [
    UsersRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ]
})
export class UserModule {
}
