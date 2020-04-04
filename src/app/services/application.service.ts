import {Injectable} from '@angular/core';
import {LOCALE_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Nomination} from '../models/nomination';
import {Specialization} from '../models/specialization';
import {ApplicationForm} from '../models/application-form';
import {Application} from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private getNominationsUrl = '/api/nominations';
  private getSpecializationsUrl = '/api/specializations';
  private getApplicationUrl = '/api/application';
  private getApplicationsUrl = '/api/applications';
  private addUpdateApplicationUrl = '/api/application';
  private removeApplicationUrl = '/api/application/';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) private locale: string) {
  }

  public getNominations(): Observable<Nomination[]> {
    return this.httpClient.get<Nomination[]>
    (`${this.getNominationsUrl}?lang=${this.locale}`).pipe(
      map(res => res.map(data => new Nomination().deserialize(data)))
    );
  }

  public getSpecializations(nominationId: number): Observable<Specialization[]> {
    return this.httpClient.get<Specialization[]>
    (`${this.getSpecializationsUrl}?lang=${this.locale}&nominationId=${nominationId}`).pipe(
      map(res => res.map(data => new Specialization().deserialize(data)))
    );
  }

  public addUpdateApplication(formValues: object): Observable<ApplicationForm> {
    const lang = this.locale;
    return this.httpClient.post<ApplicationForm>(`${this.addUpdateApplicationUrl}`, {...formValues, lang}).pipe(
      map(res => new ApplicationForm().deserialize(res))
    );
  }

  public getApplication(id: number): Observable<Application> {
    return this.httpClient.get<Application>(`${this.getApplicationUrl}?lang=${this.locale}&applicationId=${id}`).pipe(
      map(res => new Application().deserialize(res))
    );
  }

  public getApplications(festivalId: number): Observable<Application[]> {
    return this.httpClient.get<Application[]>
    (`${this.getApplicationsUrl}?lang=${this.locale}&festivalId=${festivalId}`).pipe(
      map(res => res.map(data => new Application().deserialize(data)))
    );
  }

  public removeApplication(id: number): Observable<string> {
    return this.httpClient.delete
    (`${this.removeApplicationUrl}${id}`).pipe(
      map(res => res.toString())
    );
  }
}
