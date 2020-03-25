import {Injectable} from '@angular/core';
import { LOCALE_ID, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Country} from '../models/country';
import {Region} from '../models/region';
import {City} from '../models/city';
import {EducationalInstitution} from '../models/educational-institution';
import {Nomination} from '../models/nomination';
import {Specialization} from '../models/specialization';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private getCitiesUrl = '/api/cities';
  private getEducationInstitutionsUrl = '/api/educational-institutions';
  private getNominationsUrl = '/api/nominations';
  private getSpecializationsUrl = '/api/specializations';

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              @Inject(LOCALE_ID) private locale: string) {
  }

  private getHeadersWithToken(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
  }

  public getCities(regionId: number): Observable<City[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<City[]>(`${this.getCitiesUrl}/${this.locale}/${regionId}`, {headers}).pipe(
      map(res => res.map(data => new City().deserialize(data)))
    );
  }

  public getEducationalInstitutions(cityId: number): Observable<EducationalInstitution[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<EducationalInstitution[]>(`${this.getEducationInstitutionsUrl}/${this.locale}/${cityId}`, {headers}).pipe(
      map(res => res.map(data => new EducationalInstitution().deserialize(data)))
    );
  }

  public getNominations(): Observable<Nomination[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Nomination[]>(`${this.getNominationsUrl}/${this.locale}`, {headers}).pipe(
      map(res => res.map(data => new Nomination().deserialize(data)))
    );
  }

  public getSpecializations(nominationId: number): Observable<Specialization[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Specialization[]>(`${this.getSpecializationsUrl}/${this.locale}/${nominationId}`, {headers}).pipe(
      map(res => res.map(data => new Specialization().deserialize(data)))
    );
  }
}
