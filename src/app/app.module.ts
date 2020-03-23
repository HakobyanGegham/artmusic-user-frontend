import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID, NO_ERRORS_SCHEMA} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localHy from '@angular/common/locales/hy';
import localeRu from '@angular/common/locales/ru';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {UserComponent} from './users/user/user.component';
import {UserLeftPanelComponent} from './users/user-left-panel/user-left-panel.component';
import {HeaderComponent} from './components/header/header.component';
import {AddApplicationComponent} from './components/add-application/add-application.component';
import {UsersModule} from './users/users.module';
import {ApplicantFormComponent} from './components/applicant-form/applicant-form.component';
import {ApplicationProgramFormComponent} from './components/application-program-form/application-program-form.component';
import {ApplicationFormComponent} from './components/application-form/application-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

registerLocaleData(localHy);
registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    UserLeftPanelComponent,
    HeaderComponent,
    AddApplicationComponent,
    ApplicantFormComponent,
    ApplicationProgramFormComponent,
    ApplicationFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    UsersModule,
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    CookieService,
    {provide: LOCALE_ID, useValue: 'ru'},
    {provide: LOCALE_ID, useValue: 'hy'}
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
