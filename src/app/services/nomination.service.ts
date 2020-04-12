import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Nomination} from '../models/nomination';

@Injectable({
  providedIn: 'root'
})
export class NominationService {

  private getNominationsUrl = '/api/nominations';
  private nominationUrl = '/api/nomination';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) public locale: string) {
  }

  public getNominations(): Observable<Nomination[]> {
    return this.httpClient.get<Nomination[]>
    (`${this.getNominationsUrl}`).pipe(
      map(res => res.map(data => new Nomination().deserialize(data)))
    );
  }

  public addNomination(names: {}): Observable<Nomination> {
    return this.httpClient.post<Nomination>(`${this.nominationUrl}`, {names}).pipe(
      map(res => new Nomination().deserialize(res))
    );
  }

  public updateNomination(nominationId: number, names: {}): Observable<Nomination> {
    return this.httpClient.post<Nomination>(`${this.nominationUrl}/${nominationId}`, {names}).pipe(
      map(res => new Nomination().deserialize(res))
    );
  }

  public removeNomination(nominationId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.nominationUrl}/${nominationId}`).pipe(
      map(res => res)
    );
  }
}
