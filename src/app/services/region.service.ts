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
  private regionUrl = '/api/region';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getRegions(countryId?: number): Observable<Region[]> {
    const url = countryId ? `${this.getRegionsUrl}?countryId=${countryId}` : this.getRegionsUrl;
    return this.httpClient.get<Region[]>(url).pipe(
      map(res => res.map(data => new Region().deserialize(data)))
    );
  }

  public addItem(region: string, selectedCountryId: number) {
    const data = {
      names: [{
        name: region,
        lang: this.locale,
      }],
      parentItem: selectedCountryId
    };

    return this.addRegion(data);
  }

  public addRegion(data: {}): Observable<Region> {
    return this.httpClient.post<Region>(`${this.regionUrl}`, {data}).pipe(
      map(res => new Region().deserialize(res))
    );
  }

  public updateRegion(regionId: number, data: {}): Observable<Region> {
    return this.httpClient.post<Region>(`${this.regionUrl}/${regionId}`, {...data}).pipe(
      map(res => new Region().deserialize(res))
    );
  }

  public removeRegion(regionId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.regionUrl}/${regionId}`).pipe(
      map(res => res)
    );
  }
}
