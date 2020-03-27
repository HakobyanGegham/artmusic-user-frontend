import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Region} from '../models/region';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends ApiService {

  private getRegionsUrl = '/api/regions';
  private addRegionsUrl = '/api/region';

  constructor(private httpClient: HttpClient,
              protected cookieService: CookieService,
              @Inject(LOCALE_ID) protected locale: string) {
    super(cookieService, locale);
  }

  public getRegions(countryId: number): Observable<Region[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Region[]>
    (`${this.getRegionsUrl}?lang=${this.locale}&countryId=${countryId}`, {headers}).pipe(
      map(res => res.map(data => new Region().deserialize(data)))
    );
  }

  public addRegions(region: string, countryId: number): Observable<Region> {
    const headers = this.getHeadersWithToken();
    const lang = this.locale;
    return this.httpClient.post<Region>(`${this.addRegionsUrl}`, {countryId, region, lang}, {headers}).pipe(
      map(res => new Region().deserialize(res))
    );
  }
}
