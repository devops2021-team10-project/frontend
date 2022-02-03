import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const user = {
      username,
      password,
    };
    return this.httpClient.post('/api/v1/auth/public/regularUserLogin', user);
  }

  getAuthUser(): Observable<any> {
    return this.httpClient.get('/api/v1/auth/findByJWTHeader');
  }

  getAndSaveAuthenticatedUser(): void {
    this.getAuthUser()
      .subscribe(
        (response: User) => {
          sessionStorage.setItem('authUser', JSON.stringify(response));
          console.log("User set in storage:");
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
  }

  getCurrentUser(): User | undefined {
    const userJSON = sessionStorage.getItem('authUser');
    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      return undefined;
    }
  }

  isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      return false;
    }
    return !jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('authUser');
  }
}
