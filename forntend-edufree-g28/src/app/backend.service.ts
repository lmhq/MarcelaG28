import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {


  rutaRaiz = "http://localhost:3000";
  token: string = '';
  isAutenticate: boolean = false;
  autorized: boolean = true;

  constructor(private http: HttpClient) {
    this.validarAutenticacion();
  }


  validarAutenticacion(): void {
    const token = localStorage.getItem('tokenedu');

    if (token) {
      this.token = token;
      this.isAutenticate = true;
    }
  }

  getRequest(controlador: string): Observable<any>{
    return this.http.get(
      this.rutaRaiz + '/' + controlador,
      { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) }
      );
  }

  postRequest(controlador: string, datos: string) {
    return this.http.post(
      this.rutaRaiz + '/' + controlador,
      datos,
      { 
        headers: new HttpHeaders(
          { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`       
          }
          
        ) 
      }
    )
  }
 
  patchRequest(controlador: string, id: string, datos: string) {

    return this.http.patch(
      this.rutaRaiz + '/' + controlador + '/' + id,
      datos,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        )
      }
    )
  }

  deleteRequest(controlador: string, id: string) {

    return this.http.delete(
      this.rutaRaiz + '/' + controlador + '/' + id,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        )
      }
    )
  }

  autenticateRequest(credenciales: string) {

    // const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(
      this.rutaRaiz + '/autenticar',
      credenciales,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    )
  }

}