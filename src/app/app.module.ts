import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {NgModule, LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import localHy from '@angular/common/locales/hy';
import localeRu from '@angular/common/locales/ru';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

registerLocaleData(localHy);
registerLocaleData(localeRu);

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    ),
  ],
  providers: [
    CookieService,
    {provide: LOCALE_ID, useValue: 'ru'},
    {provide: LOCALE_ID, useValue: 'hy'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
