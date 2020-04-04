import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Token} from '../models/token';
import {User} from '../models/user';

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
  public register(params: {}): Observable<User> {
    return this.httpClient.post<User>(this.registerUrl, params).pipe(
      map(res => new User().deserialize(res))
    );
  }

  /**
   * Login user
   *
   *  params
   */
  public login(params: {}): Observable<User> {
    return this.httpClient.post<User>(this.loginUrl, params).pipe(
      map(res => new User().deserialize(res))
    );
  }
}
