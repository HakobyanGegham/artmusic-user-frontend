import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Token} from '../models/token';
import {User} from '../models/user';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = '/api/user/register';
  private loginUrl = '/api/user/login';

  constructor(private httpClient: HttpClient,
              private tokenService: TokenService,
              private router: Router) {
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
  public login(params: any): Observable<User> {
    return this.httpClient.post<User>(this.loginUrl, params).pipe(
      map(res => new User().deserialize(res))
    );
  }

  public logout() {
    this.tokenService.removeToken();
    this.tokenService.removeUser();
    this.router.navigateByUrl('/login');
  }
}
