import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Applicant} from '../models/applicant';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  private getApplicantUrl = '/api/applicants';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) private locale: string) {
  }

  public getApplicants(): Observable<Applicant[]> {
    return this.httpClient.get<Applicant[]>(`${this.getApplicantUrl}?lang=${this.locale}`).pipe(
      map(res => res.map(data => new Applicant().deserialize(data)))
    );
  }
}
