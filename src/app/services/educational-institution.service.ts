import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {EducationalInstitution} from '../models/educational-institution';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EducationalInstitutionService extends ApiService {

  private getEducationInstitutionsUrl = '/api/educational-institutions/';
  private addEducationInstitutionsUrl = '/api/educational-institution/';

  constructor(private httpClient: HttpClient,
              protected cookieService: CookieService,
              @Inject(LOCALE_ID) protected locale: string) {
    super(cookieService, locale);
  }

  public getEducationalInstitutions(cityId: number): Observable<EducationalInstitution[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<EducationalInstitution[]>(`${this.getEducationInstitutionsUrl}${this.locale}/${cityId}`,
      {headers}).pipe(
      map(res => res.map(data => new EducationalInstitution().deserialize(data)))
    );
  }

  public addEducationalInstitution(educationalInstitution: string, cityId: number): Observable<EducationalInstitution> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.post<EducationalInstitution>(`${this.addEducationInstitutionsUrl}${this.locale}`, {
      cityId,
      educationalInstitution
    }, {headers}).pipe(
      map(res => new EducationalInstitution().deserialize(res))
    );
  }
}
