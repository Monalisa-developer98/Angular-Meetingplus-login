import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private apiUrl = 'http://localhost:8090/api/auth';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  addUsers(userData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/createEmployee`;
    return this.http.post(urlStr, userData); 
  }

  login(userData: any): Observable<any> {
    const urlStr = `${this.apiUrl}/login`;
    return this.http.post(urlStr, userData).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  getEmployeeById(id: string): Observable<any> {
    const url = `${this.apiUrl}/viewSingleEmployee/${id}`;
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError('No token found in local storage');
    }

    const tokenStr = token.startsWith('Bearer ') ? token.substring(7) : token;

    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenStr}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error fetching employee data:', error);
        return throwError(error);
      })
    );
  }

  getRoleFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return null;
    }
    const tokenStr = token.startsWith('Bearer ') ? token.substring(7) : token;
    try {
      if (this.jwtHelper.isTokenExpired(tokenStr)) {
        console.error('Token has expired');
        return null;
      }
      const decodedToken = this.jwtHelper.decodeToken(tokenStr);
      console.log('Decoded Token:', decodedToken); 
      return decodedToken.role || null;
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  }

getEmployees(order: number, limit: number, page: number, payload: any): Observable<any> {
  const url = `${this.apiUrl}/listEmployee?order=${order}&page=${page}`;
  return this.http.post(url, payload);
}
 
}