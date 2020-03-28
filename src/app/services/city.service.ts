import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../models/city';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private getCitiesUrl = '/api/cities';
  private addCityUrl = '/api/city';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getCities(regionId: number): Observable<City[]> {
    return this.httpClient.get<City[]>(`${this.getCitiesUrl}?lang=${this.locale}&regionId=${regionId}`).pipe(
      map(res => res.map(data => new City().deserialize(data)))
    );
  }

  public addCity(city: string, regionId: number): Observable<City> {
    return this.httpClient.post<City>(`${this.addCityUrl}`, {regionId, city, lang: this.locale}).pipe(
      map(res => new City().deserialize(res))
    );
  }
}
