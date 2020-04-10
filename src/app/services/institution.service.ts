import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {Institution} from '../models/institution';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private getInstitutionsUrl = '/api/institutions';
  private institutionUrl = '/api/institution';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getInstitutions(cityId?: number): Observable<Institution[]> {
    const url = cityId ? `${this.getInstitutionsUrl}?cityId=${cityId}` : this.getInstitutionsUrl;
    return this.httpClient.get<Institution[]>(url).pipe(
      map(res => res.map(data => new Institution().deserialize(data)))
    );
  }

  public addEducationalInstitution(institution: string, cityId: number): Observable<Institution> {
    return this.httpClient.post<Institution>
    (`${this.institutionUrl}`, {cityId, institution, lang: this.locale}).pipe(
      map(res => new Institution().deserialize(res))
    );
  }

  public updateInstitution(institutionId: number, data: {}): Observable<Institution> {
    return this.httpClient.post<Institution>(`${this.institutionUrl}/${institutionId}`, {...data}).pipe(
      map(res => new Institution().deserialize(res))
    );
  }

  public removeInstitution(institutionId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.institutionUrl}/${institutionId}`).pipe(
      map(res => res)
    );
  }
}
