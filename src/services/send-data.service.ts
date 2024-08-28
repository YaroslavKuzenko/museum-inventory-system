import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contactFormConfig } from '../config/config-schema';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  private endpoint: string = contactFormConfig.endpoint;

  constructor(private http: HttpClient) {}

  submitForm(data: any): Observable<any> {
    return this.http.post(this.endpoint, data);
  }
}
