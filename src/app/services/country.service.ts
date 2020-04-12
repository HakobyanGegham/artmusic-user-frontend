import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable, pipe} from 'rxjs';
import {Country} from '../models/country';
import {map} from 'rxjs/operators';
import {LOCALE_ID, Inject} from '@angular/core';
import {$t} from 'codelyzer/angular/styles/chars';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private getCountriesUrl = '/api/countries';
  private countryUrl = '/api/country';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.getCountriesUrl}`).pipe(
      map(res => res.map(data => new Country().deserialize(data)))
    );
  }

  public addItem(newCountry: string) {
    return this.addCountry({name: newCountry, key: this.locale});
  }

  public addCountry(names: {}): Observable<Country> {
    return this.httpClient.post<Country>(`${this.countryUrl}`, {names}).pipe(
      map(res => new Country().deserialize(res))
    );
  }

  public updateCountry(countryId: number, names = {}): Observable<Country> {
    return this.httpClient.post<Country>(`${this.countryUrl}/${countryId}`, {names}).pipe(
      map(res => new Country().deserialize(res))
    );
  }

  public removeCountry(countryId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.countryUrl}/${countryId}`).pipe(
      map(res => res)
    );
  }
}
