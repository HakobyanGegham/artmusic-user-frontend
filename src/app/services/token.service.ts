import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public saveUser(user: User) {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  public getToken() {
    return window.sessionStorage.getItem('token');
  }

  public getUser() {
    return window.sessionStorage.getItem('user');
  }

  public removeToken() {
    window.sessionStorage.removeItem('token');
  }

  public removeUser() {
    window.sessionStorage.removeItem('user');
  }
}
