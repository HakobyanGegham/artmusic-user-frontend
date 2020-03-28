import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Region} from '../models/region';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private getRegionsUrl = '/api/regions';
  private addRegionsUrl = '/api/region';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getRegions(countryId: number): Observable<Region[]> {
    return this.httpClient.get<Region[]>
    (`${this.getRegionsUrl}?lang=${this.locale}&countryId=${countryId}`).pipe(
      map(res => res.map(data => new Region().deserialize(data)))
    );
  }

  public addRegions(region: string, countryId: number): Observable<Region> {
    return this.httpClient.post<Region>(`${this.addRegionsUrl}`, {countryId, region, lang: this.locale}).pipe(
      map(res => new Region().deserialize(res))
    );
  }
}
