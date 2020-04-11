import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {FestivalContentComponent} from './festival-content/festival-content.component';
import {ApplicationsComponent} from './applications/applications.component';
import {ApplicantsComponent} from './applicants/applicants.component';
import {AuthGuardService} from '../services/auth-guard.service';

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'festival',
        component: FestivalContentComponent,
      },
      {
        path: 'festival/:festivalId/applications',
        component: ApplicationsComponent,
      },
      {
        path: 'festival/:festivalId/applicants',
        component: ApplicantsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
