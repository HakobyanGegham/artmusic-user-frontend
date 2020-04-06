import {Injectable} from '@angular/core';
import {LOCALE_ID, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  private addUpdateNominationUrl = '/api/nomination';
  private getSpecializationsUrl = '/api/specializations';
  private addUpdatedSpecializationUrl = '/api/specialization';
  private getApplicationUrl = '/api/application';
  private getApplicationsUrl = '/api/applications';
  private addUpdateApplicationUrl = '/api/application';
  private removeApplicationUrl = '/api/application/';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) private locale: string) {
  }

  public getNominations(): Observable<Nomination[]> {
    return this.httpClient.get<Nomination[]>
    (`${this.getNominationsUrl}`).pipe(
      map(res => res.map(data => new Nomination().deserialize(data)))
    );
  }

  public updateNomination(nominationId: number, data: {}): Observable<Nomination> {
    return this.httpClient.post<Nomination>(`${this.addUpdateNominationUrl}/${nominationId}`, {...data}).pipe(
      map(res => new Nomination().deserialize(res))
    );
  }


  public updateSpecialization(specializationId: number, data: {}): Observable<Specialization> {
    return this.httpClient.post<Specialization>
    (`${this.addUpdatedSpecializationUrl}/${specializationId}`, {...data}).pipe(
      map(res => new Specialization().deserialize(res))
    );
  }

  public getSpecializations(nominationId?: number): Observable<Specialization[]> {
    const url = nominationId ? `${this.getSpecializationsUrl}?nominationId=${nominationId}` : this.getSpecializationsUrl;
    return this.httpClient.get<Specialization[]>(url).pipe(
      map(res => res.map(data => new Specialization().deserialize(data)))
    );
  }

  public addUpdateApplication(formValues: object): Observable<ApplicationForm> {
    const lang = this.locale;
    return this.httpClient.post<ApplicationForm>
    (`${this.addUpdateApplicationUrl}`, {...formValues, lang}).pipe(
      map(res => new ApplicationForm().deserialize(res))
    );
  }

  public getApplication(id: number): Observable<Application> {
    return this.httpClient.get<Application>
    (`${this.getApplicationUrl}?lang=${this.locale}&applicationId=${id}`).pipe(
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
    return this.httpClient.delete(`${this.removeApplicationUrl}${id}`).pipe(
      map(res => res.toString())
    );
  }

}
