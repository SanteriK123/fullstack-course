import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any
  user: any

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}


  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).pipe();
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  loginUser(user: any) {
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:3000/users/login', user, {headers: headers}).pipe(map((res: any) => res.json));
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear()
  }

  isLoggedOut() {
    return this.jwtHelper.isTokenExpired(this.authToken);
  }
  registerUser(user: any) {
    let headers = new HttpHeaders();
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).pipe();
  }

}
