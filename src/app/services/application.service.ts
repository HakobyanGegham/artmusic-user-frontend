import {Injectable} from '@angular/core';
import {LOCALE_ID, Inject} from '@angular/core';
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
import {ApplicationForm} from '../models/application-form';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private getNominationsUrl = '/api/nominations';
  private getSpecializationsUrl = '/api/specializations';
  private addApplicationUrl = '/api/application';

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService,
              @Inject(LOCALE_ID) private locale: string) {
  }

  private getHeadersWithToken(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
  }

  public getNominations(): Observable<Nomination[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Nomination[]>
    (`${this.getNominationsUrl}?lang=${this.locale}`, {headers}).pipe(
      map(res => res.map(data => new Nomination().deserialize(data)))
    );
  }

  public getSpecializations(nominationId: number): Observable<Specialization[]> {
    const headers = this.getHeadersWithToken();
    return this.httpClient.get<Specialization[]>
    (`${this.getSpecializationsUrl}?lang=${this.locale}&nominationId=${nominationId}`, {headers}).pipe(
      map(res => res.map(data => new Specialization().deserialize(data)))
    );
  }

  public addApplication(formValues: object): Observable<ApplicationForm> {
    const headers = this.getHeadersWithToken();
    const lang = this.locale;
    return this.httpClient.post<ApplicationForm>(`${this.addApplicationUrl}`, {...formValues, lang}, {headers}).pipe(
      map(res => new ApplicationForm().deserialize(res))
    );
  }
}
