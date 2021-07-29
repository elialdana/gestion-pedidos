import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn : 'root'
})

export class Servicios {
   baseUrl = environment.baseURL;
   urlUsers = this.baseUrl + '/users';


   constructor(private http: HttpClient) { }

   getHeadders(){
    const httpOptions= {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': '25',
        'Access-Control-Allow-Origin':'*'
      })
    };
    return httpOptions;
   }

   public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        if (error.status === 200) {
            // console.log('carga-archivo: sin error HttpErrorResponse');
        } else {
            // console.error('carga-archivo: Ocurrio un error:', error.error.message);
        }

    } else {
        if (error.status === 200) {
            // console.log('carga-archivo: sin error HttpErrorResponse');
        } else {
            // console.error('carga-archivo::Código de respuesta ' + error.status +', body was: ' + error.error);
        }
    }
    return throwError(
        'carga-archivo: Algo malo paso, por favor intente mas tarde.');
};


  public getLogin(login: Object) : Observable <any> {
    return this.http.post <any>(`${this.urlUsers}/authenticate`, login);
   }



}
