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
  private addiInstitutionsUrl = '/api/institution';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getEducationalInstitutions(cityId: number): Observable<Institution[]> {
    return this.httpClient.get<Institution[]>
    (`${this.getInstitutionsUrl}?lang=${this.locale}&cityId=${cityId}`).pipe(
      map(res => res.map(data => new Institution().deserialize(data)))
    );
  }

  public addEducationalInstitution(institution: string, cityId: number): Observable<Institution> {
    return this.httpClient.post<Institution>
    (`${this.addiInstitutionsUrl}`, {cityId, institution, lang: this.locale}).pipe(
      map(res => new Institution().deserialize(res))
    );
  }
}
