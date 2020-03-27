import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Country} from '../models/country';
import {map} from 'rxjs/operators';
import {LOCALE_ID, Inject} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends ApiService {

  private getCountriesUrl = '/api/countries';
  private addCountriesUrl = '/api/country';

  constructor(private httpClient: HttpClient,
              protected cookieService: CookieService,
              @Inject(LOCALE_ID) protected locale: string) {
    super(cookieService, locale);
  }

  public getCountries(): Observable<Country[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Country[]>(`${this.getCountriesUrl}?lang=${this.locale}`, {headers}).pipe(
      map(res => res.map(data => new Country().deserialize(data)))
    );
  }

  public addCountry(country: string): Observable<Country> {
    const headers = this.getHeadersWithToken();
    const lang = this.locale;
    return this.httpClient.post<Country>(`${this.addCountriesUrl}`, {country, lang}, {headers}).pipe(
      map(res => new Country().deserialize(res))
    );
  }
}
