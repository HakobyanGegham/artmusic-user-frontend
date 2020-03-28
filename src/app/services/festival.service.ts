import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Festival} from '../models/festival';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  private getUrl = '/api/festivals';

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) protected locale: string) {
  }

  public getFestivals(): Observable<Festival[]> {
    return this.httpClient.get<Festival[]>(`${this.getUrl}?lang=${this.locale}`).pipe(
      map(res => res.map(data => new Festival().deserialize(data)))
    );
  }
}
