import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  getPersonas(): Observable<any[]> {
    this.apiUrl = `${environment.apiUrl}/Persona`;
    return this.http.get<any[]>(this.apiUrl);
  }

  postPersona(dto: { persona: any, usuario: any }): Observable<any> {
    const url = `${environment.apiUrl}/Persona`;
    return this.http.post<any>(url, dto);
  }

  postAutenticacion(correo: string, contrasena: string): Observable<any> {
    const url = `${environment.apiUrl}/Usuario/Autenticacion`;
    const body = {
      correo,
      contrasena
    };
    return this.http.post<any>(url, body);
  }



}
