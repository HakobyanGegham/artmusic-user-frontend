import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Token} from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = '/api/user/register';
  private loginUrl = '/api/user/login';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Register user
   *
   * params
   */
  public register(params: {}): Observable<Token> {
    return this.httpClient.post<Token>(this.registerUrl, params).pipe(
      map(res => new Token().deserialize(res))
    );
  }

  /**
   * Login user
   *
   *  params
   */
  public login(params: {}): Observable<Token> {
    return this.httpClient.post<Token>(this.loginUrl, params).pipe(
      map(res => new Token().deserialize(res))
    );
  }
}
