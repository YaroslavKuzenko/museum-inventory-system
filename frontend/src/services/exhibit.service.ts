import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExhibitService {
  private apiUrl = 'http://127.0.0.1:8000/exponats';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`, { withCredentials: true });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`,{ withCredentials: true });
  }

  addExhibit(exhibit: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, exhibit, { withCredentials: true });
  }

  updateExhibit(id: number, exhibit: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, exhibit, { withCredentials: true });
  }

  deleteExhibit(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
