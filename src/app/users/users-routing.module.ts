import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {FestivalContentComponent} from './festival-content/festival-content.component';
import {ApplicationsComponent} from './applications/applications.component';

const userRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'festival',
        component: FestivalContentComponent,
      },
      {
        path: 'festival/:festivalId/applications',
        component: ApplicationsComponent,
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
