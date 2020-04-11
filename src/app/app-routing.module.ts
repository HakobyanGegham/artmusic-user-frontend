import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AddUpdateApplicationComponent} from './components/add-update-application/add-update-application.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AppComponent} from './app.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'application', component: AddUpdateApplicationComponent, canActivate: [AuthGuardService]},
  {path: 'application/:applicationId', component: AddUpdateApplicationComponent, canActivate: [AuthGuardService]},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
