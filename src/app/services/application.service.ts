import {Injectable} from '@angular/core';
import {LOCALE_ID, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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

  public addApplication(formValues: object): Observable<ApplicationForm> {
    const lang = this.locale;
    return this.httpClient.post<ApplicationForm>(`${this.addApplicationUrl}`, {...formValues, lang}).pipe(
      map(res => new ApplicationForm().deserialize(res))
    );
  }
}
