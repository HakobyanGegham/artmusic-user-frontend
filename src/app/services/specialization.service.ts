import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {Observable} from 'rxjs';
import {Specialization} from '../models/specialization';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {
  private getSpecializationsUrl = '/api/specializations';
  private specializationUrl = '/api/specialization';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) public locale: string) {
  }

  public getSpecializations(nominationId?: number): Observable<Specialization[]> {
    const url = nominationId ? `${this.getSpecializationsUrl}?nominationId=${nominationId}` : this.getSpecializationsUrl;
    return this.httpClient.get<Specialization[]>(url).pipe(
      map(res => res.map(data => new Specialization().deserialize(data)))
    );
  }

  public addSpecialization(names: {}): Observable<Specialization> {
    return this.httpClient.post<Specialization>(`${this.specializationUrl}`, {...names}).pipe(
      map(res => new Specialization().deserialize(res))
    );
  }

  public updateSpecialization(specializationId: number, data: {}): Observable<Specialization> {
    return this.httpClient.post<Specialization>
    (`${this.specializationUrl}/${specializationId}`, {...data}).pipe(
      map(res => new Specialization().deserialize(res))
    );
  }

  public removeSpecialization(specializationId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.specializationUrl}/${specializationId}`).pipe(
      map(res => res)
    );
  }
}
