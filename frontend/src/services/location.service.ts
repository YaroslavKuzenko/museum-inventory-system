import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://127.0.0.1:8000/locations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, { withCredentials: true });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  addLocation(location: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, location, { withCredentials: true });
  }

  updateLocation(id: number, location: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, location, { withCredentials: true });
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
