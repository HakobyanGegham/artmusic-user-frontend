import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from '../users/user.component';
import {FestivalContentComponent} from '../users/festival-content/festival-content.component';
import {ApplicationsComponent} from '../users/applications/applications.component';
import {ApplicantsComponent} from '../users/applicants/applicants.component';
import {AuthGuardService} from '../services/auth-guard.service';

const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'festivals',
    pathMatch: 'full'
  },
  {
    path: 'festivals',
    component: UserComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: ':festivalId/applications',
        component: ApplicationsComponent,
      },
      {
        path: ':festivalId/applicants',
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
