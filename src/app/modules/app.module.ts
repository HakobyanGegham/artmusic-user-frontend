import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID, NO_ERRORS_SCHEMA} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localHy from '@angular/common/locales/hy';
import localeRu from '@angular/common/locales/ru';
import {RegisterComponent} from '../components/register/register.component';
import {LoginComponent} from '../components/login/login.component';
import {UserComponent} from '../users/user.component';
import {HeaderComponent} from '../components/header/header.component';
import {AddUpdateApplicationComponent} from '../components/add-update-application/add-update-application.component';
import {ApplicantFormComponent} from '../components/applicant-form/applicant-form.component';
import {ApplicationProgramFormComponent} from '../components/application-program-form/application-program-form.component';
import {ApplicationFormComponent} from '../components/application-form/application-form.component';
import {ApplicationAddConfirmDialogComponent} from '../components/modals/application-add-confirm-dialog/application-add-confirm-dialog.component';
import {TokenInterceptor} from '../interceptors/token-interceptor';
import {AutocompleteComponent} from '../components/util/autocomplete/autocomplete.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {RemoveApplicationDialogComponent} from '../components/modals/remove-application-dialog/remove-application-dialog.component';
import {UserModule} from './user.module';
import {AdminModule} from './admin.module';
import {SharedModule} from './shared/shared.module';
import {ErrorInterceptor} from '../interceptors/error.interceptor';

registerLocaleData(localHy);
registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    AddUpdateApplicationComponent,
    ApplicantFormComponent,
    ApplicationProgramFormComponent,
    ApplicationFormComponent,
    ApplicationAddConfirmDialogComponent,
    AutocompleteComponent,
    RemoveApplicationDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    AdminModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule
  ],
  providers: [
    CookieService,
    {provide: LOCALE_ID, useValue: 'ru'},
    {provide: LOCALE_ID, useValue: 'hy'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
