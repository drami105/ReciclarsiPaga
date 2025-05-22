import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
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

  getTiposDocumento(): Observable<any[]> {
    this.apiUrl = `${environment.apiUrl}/TipoDocumento`;
    return this.http.get<any[]>(this.apiUrl);
  }

  postRecoleccion(recoleccion: any): Observable<any> {
    const url = `${environment.apiUrl}/Recoleccion`;
    return this.http.post<any>(url, recoleccion);
  }

  getSolicitudes(idUsuario: number): Observable<any[]> {
    const url = `${environment.apiUrl}/Recoleccion/${idUsuario}`;
    return this.http.get<any[]>(url);
  }

  getPuntosPorUsuario(idUsuario: number): Observable<number> {
    const url = `${this.apiUrl}/Puntos/usuario/${idUsuario}`;
    return this.http.get<number>(url);
  }

  getKilogramosConfPorUsuario(idUsuario: number): Observable<number> {
    const url = `${this.apiUrl}/Recoleccion/usuario/${idUsuario}`;
    return this.http.get<number>(url);
  }

  getUsuarios(): Observable<any[]> {
    const url = `${environment.apiUrl}/Usuario/detalle`;
    return this.http.get<any[]>(url);
  }

}
