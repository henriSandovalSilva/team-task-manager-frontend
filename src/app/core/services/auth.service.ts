import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', { email, password })
      .pipe(tap(response => localStorage.setItem('jwt_token', response.access_token)));
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  logout() {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  register(email: string, password: string) {
    return this.http.post('http://localhost:3000/users', { email, password });
  }

  getUser() {
    const token = this.getToken();
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }
  
}
