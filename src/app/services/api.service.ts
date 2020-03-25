import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected cookieService: CookieService,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getHeadersWithToken(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
  }
}
