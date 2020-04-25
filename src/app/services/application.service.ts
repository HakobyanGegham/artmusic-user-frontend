import {Injectable} from '@angular/core';
import {LOCALE_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApplicationForm} from '../models/application-form';
import {Application} from '../models/application';
import {TokenService} from './token.service';
import {Form} from '@angular/forms';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private getApplicationsUrl = '/api/applications';
  private applicationUrl = '/api/application';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) private locale: string,
              private tokenService: TokenService) {
  }

  public getApplications(festivalId: number): Observable<Application[]> {
    return this.httpClient.get<Application[]>
    (`${this.getApplicationsUrl}?lang=${this.locale}&festivalId=${festivalId}`).pipe(
      map(res => res.map(data => new Application().deserialize(data)))
    );
  }

  public getApplication(id: number): Observable<Application> {
    return this.httpClient.get<Application>(`${this.applicationUrl}?lang=${this.locale}&applicationId=${id}`).pipe(
      map(res => new Application().deserialize(res))
    );
  }

  public addUpdateApplication(formData: FormData): Observable<ApplicationForm> {
    formData.append('lang', this.locale);
    const httpOptions = {
      headers: new HttpHeaders({
        enctype:  'multipart/form-data;',
        Authorization: `Bearer ${this.tokenService.getToken()}`
      })
    };
    return this.httpClient.post<ApplicationForm>(`${this.applicationUrl}`, formData, httpOptions).pipe(
      map(res => new ApplicationForm().deserialize(res))
    );
  }

  public removeApplication(id: number): Observable<string> {
    return this.httpClient.delete(`${this.applicationUrl}/${id}`).pipe(
      map(res => res.toString())
    );
  }
}
