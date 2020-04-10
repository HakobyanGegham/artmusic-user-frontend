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
  private cityUrl = '/api/city';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getCities(regionId?: number): Observable<City[]> {
    const url = regionId ? `${this.getCitiesUrl}?regionId=${regionId}` : this.getCitiesUrl;
    return this.httpClient.get<City[]>(url).pipe(
      map(res => res.map(data => new City().deserialize(data)))
    );
  }

  public addCity(city: string, regionId: number): Observable<City> {
    return this.httpClient.post<City>(`${this.cityUrl}`, {regionId, city, lang: this.locale}).pipe(
      map(res => new City().deserialize(res))
    );
  }

  public updateCity(cityId: number, data: {}): Observable<City> {
    return this.httpClient.post<City>(`${this.cityUrl}/${cityId}`, {...data}).pipe(
      map(res => new City().deserialize(res))
    );
  }

  public removeCity(cityId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.cityUrl}/${cityId}`).pipe(
      map(res => res)
    );
  }
}
