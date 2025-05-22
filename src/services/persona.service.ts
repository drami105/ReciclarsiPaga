import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from 'src/app/models/persona.model';
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

  getPersonasId(id: number): Observable<Persona> {
    this.apiUrl = `${environment.apiUrl}/Persona/`+id;
    return this.http.get<Persona>(this.apiUrl);
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

  actualizarPersona(id: number, persona: Persona): Observable<any> {
    const url = this.apiUrl = `${environment.apiUrl}/Persona/${id}`;
    return this.http.put<any>(url, persona);
  }

  actualizarPersonaCompleta(id: number, idPerfil: number, persona: Persona): Observable<any> {
    const url = this.apiUrl = `${environment.apiUrl}/Persona/${id}/${idPerfil}`;
    return this.http.put<any>(url, persona);
  }

}
