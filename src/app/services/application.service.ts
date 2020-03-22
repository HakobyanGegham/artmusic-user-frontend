import {Injectable} from '@angular/core';
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

  private getCountriesUrl = '/api/countries';
  private getRegionsUrl = '/api/regions';
  private getCitiesUrl = '/api/cities';
  private getEducationInstitutionsUrl = '/api/educational-institutions';
  private getNominationsUrl = '/api/nominations';
  private getSpecializationsUrl = '/api/specializations';

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {
  }

  private getHeadersWithToken(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
  }

  private getLocale() {
    return 'hy';
  }

  public getCountries(): Observable<Country[]> {
    const headers = this.getHeadersWithToken();

    return this.httpClient.get<Country[]>(`${this.getCountriesUrl}/${this.getLocale()}`, {headers}).pipe(
      map(res => res.map(data => new Country().deserialize(data)))
    );
  }

  public getRegions(): Observable<Region[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Region[]>(`${this.getRegionsUrl}/${this.getLocale()}`, {headers}).pipe(
      map(res => res.map(data => new Region().deserialize(data)))
    );
  }

  public getCities(): Observable<City[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<City[]>(`${this.getCitiesUrl}/${this.getLocale()}`, {headers}).pipe(
      map(res => res.map(data => new City().deserialize(data)))
    );
  }

  public getEducationalInstitutions(): Observable<EducationalInstitution[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<EducationalInstitution[]>(`${this.getEducationInstitutionsUrl}/${this.getLocale()}`, {headers}).pipe(
      map(res => res.map(data => new EducationalInstitution().deserialize(data)))
    );
  }

  public getNominations(): Observable<Nomination[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Nomination[]>(`${this.getNominationsUrl}/${this.getLocale()}`, {headers}).pipe(
      map(res => res.map(data => new Nomination().deserialize(data)))
    );
  }

  public getSpecializations(): Observable<Specialization[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Specialization[]>(`${this.getSpecializationsUrl}/${this.getLocale()}`, {headers}).pipe(
      map(res => res.map(data => new Specialization().deserialize(data)))
    );
  }
}
