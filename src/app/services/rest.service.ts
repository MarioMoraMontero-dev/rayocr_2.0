import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Token } from '../interfaces/token';
import { JsonLoginDatos } from '../interfaces/json-login-datos';
const endpoint = 'https://rayocr.my.salesforce.com/services/';
//const endpoint = 'https://rayocr--partialqa.my.salesforce.com/services/';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}
  public data!: JsonLoginDatos[];
  body = new HttpParams()
    .set('username', 'admin@instantloanscr.com')
    .set('password', 'JulioRayo2021Adh6Tx1MR2Ed4A2oeIJkXv5F')
    .set('grant_type', 'password')
    .set(
      'client_id',
      '3MVG9xOCXq4ID1uFE9DjJL8SWOYDt26ODxlaVr3qYsPEiHKoYvlL3_5DF_6hQvBbSfT5rs3LbHg_gTQU0fkbg'
    )
    .set(
      'client_secret',
      '1576732546EDADC27994DA302B0B78A0E6A0CEEDC60FEA5079A2D750C4CB0ACD'
    );

  /*.set('username', 'admin@instantloanscr.com.partialqa')
    .set('password', '1995CarorTJvRdHpRQpBXt8asl0qpcHd')
    .set('grant_type', 'password')
    .set(
      'client_id',
      '3MVG9zZht._ZaMul1Lx9yQsWBSlG2FGD27L7cF3zzKWcZoQyFYiqbrjhdku.rliUv3.7hGAsz5YeNMjdCP5FT'
    )
    .set(
      'client_secret',
      'D287925822BCEFC7B7F4F1D076C74BC2FC6EA7B7EFEA8580CEB865F0BD146990'
    );*/

  getToken(): Observable<any> {
    return this.http.post<any>(endpoint + 'oauth2/token', this.body).pipe(
      map((data: Token[]) => {
        console.log('Salida Data: ' + data);

        return data;
      }),
      catchError((error) => {
        return throwError('Error');
      })
    );
  }

  postNesSolicitud(token: string, Solicitud: any): Observable<any> {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    return this.http.post<any>(endpoint + 'apexrest/NewSolicitud', Solicitud, {
      headers: header2,
    });
  }

  postlogin(token: string, login: any): Observable<any> {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    return this.http.post<any>(
      endpoint + 'apexrest/loginWS',
      JSON.stringify(login),
      { headers: header2 }
    );
  }

  postRenovacion(
    token: string,
    idC: String,
    pais: String,
    provincia: String,
    canton: String,
    distrito: String,
    direc: String
  ) {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    let json =
      '{"id":"' +
      idC +
      '","pais":"' +
      pais +
      '","provincia":"' +
      provincia +
      '","canton":"' +
      canton +
      '","distrito":"' +
      distrito +
      '","direccionExacta":"' +
      direc +
      '"}';
    return this.http.post<any>(endpoint + 'apexrest/renovar/', json, {
      headers: header2,
    });
  }

  postFinalizarProceso(token: string, jsonFinal: any) {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    return this.http.post<any>(
      endpoint + 'apexrest/finalizarProcesoWS/',
      JSON.stringify(jsonFinal),
      { headers: header2 }
    );
  }

  postRecuperarContra(token: string, emailUser: String) {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    let json = '{"emailCliente":"' + emailUser + '"}';
    return this.http.post<any>(endpoint + 'apexrest/recuperarPass/', json, {
      headers: header2,
    });
  }

  postFinalizarProcesoRayoPlus(token: string, jsonFinal: any) {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    return this.http.post<any>(
      endpoint + 'apexrest/finalizarProcesoRayoPlusWS/',
      JSON.stringify(jsonFinal),
      { headers: header2 }
    );
  }

  postSolicitudRayoPlus(token: string, Solicitud: any): Observable<any> {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    return this.http.post<any>(endpoint + 'apexrest/renovarRP/', Solicitud, {
      headers: header2,
    });
  }

  postvistaPagosRayoPL(token: string, login: any) {
    const header2 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'OAuth ' + token);
    return this.http.post<any>(
      endpoint + 'apexrest/consultaPagosRayoPL',
      JSON.stringify(login),
      { headers: header2 }
    );
  }
}
