import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AddUpdateApplicationComponent} from './components/add-update-application/add-update-application.component';


const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'application', component: AddUpdateApplicationComponent},
  {path: 'application/:applicationId', component: AddUpdateApplicationComponent}
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
