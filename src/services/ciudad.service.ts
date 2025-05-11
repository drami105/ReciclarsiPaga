import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getCiudades(): Observable<any[]> {
    this.apiUrl = `${environment.apiUrl}/Ciudad`;
    return this.http.get<any[]>(this.apiUrl);
  }

  getBarrios(): Observable<any[]> {
    this.apiUrl = `${environment.apiUrl}/Barrio`;
    return this.http.get<any[]>(this.apiUrl);
  }

}
