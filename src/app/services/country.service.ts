import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Country} from '../models/country';
import {map} from 'rxjs/operators';
import {LOCALE_ID, Inject} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private getCountriesUrl = '/api/countries';
  private addCountriesUrl = '/api/country';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.getCountriesUrl}?lang=${this.locale}`).pipe(
      map(res => res.map(data => new Country().deserialize(data)))
    );
  }

  public addCountry(country: string): Observable<Country> {
    return this.httpClient.post<Country>(`${this.addCountriesUrl}`, {country, lang: this.locale}).pipe(
      map(res => new Country().deserialize(res))
    );
  }
}
