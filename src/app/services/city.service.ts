import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {City} from '../models/city';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ApiService {

  private getCitiesUrl = '/api/cities/';
  private addCityUrl = '/api/city/';

  constructor(private httpClient: HttpClient,
              protected cookieService: CookieService,
              @Inject(LOCALE_ID) protected locale: string) {
    super(cookieService, locale);
  }

  public getCities(regionId: number): Observable<City[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<City[]>(`${this.getCitiesUrl}${this.locale}/${regionId}`, {headers}).pipe(
      map(res => res.map(data => new City().deserialize(data)))
    );
  }

  public addCity(city: string, regionId: number): Observable<City> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.post<City>(`${this.addCityUrl}${this.locale}`, {regionId, city}, {headers}).pipe(
      map(res => new City().deserialize(res))
    );
  }
}
