import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    const registerModel = {
      email: userData.email,
      password: userData.password,
      is_active: true,
      is_superuser: false,
      is_verified: false,
      role_id: 1
    }
    return this.http.post(`${this.apiUrl}/auth/register`, registerModel);
  }

  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', email)
      .set('password', password)
      .set('scope', '')
      .set('client_id', '')
      .set('client_secret', '');

    return this.http.post(`${this.apiUrl}/auth/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    });
  }

  // don't work
  isLoggedIn(): boolean {
    return document.cookie.includes('mis');
  }

}
