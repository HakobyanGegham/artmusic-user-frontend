import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Region} from '../models/region';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private getRegionsUrl = '/api/regions';
  private addUpdateRegionUrl = '/api/region';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getRegions(countryId?: number): Observable<Region[]> {
    const url = countryId ? `${this.getRegionsUrl}?countryId=${countryId}` : this.getRegionsUrl;
    return this.httpClient.get<Region[]>(url).pipe(
      map(res => res.map(data => new Region().deserialize(data)))
    );
  }

  public addRegions(region: string, countryId: number): Observable<Region> {
    return this.httpClient.post<Region>(`${this.addUpdateRegionUrl}`, {countryId, region, lang: this.locale}).pipe(
      map(res => new Region().deserialize(res))
    );
  }

  public updateRegion(regionId: number, data: {}): Observable<Region> {
    return this.httpClient.post<Region>(`${this.addUpdateRegionUrl}/${regionId}`, {...data}).pipe(
      map(res => new Region().deserialize(res))
    );
  }
}
