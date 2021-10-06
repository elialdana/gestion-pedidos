import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://ec2-54-163-156-198.compute-1.amazonaws.com:3000';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { }
    getHeadders(){
      const httpOptions= {
        headers: new HttpHeaders({
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'

        })
      };
      return httpOptions;
     }
  singin(user:any){
    return this.http.post(`${this.URL}/usuario/authenticate`,user,this.getHeadders());
  }
  loginOut(){

    localStorage.removeItem("token");



  }

  isAuth():boolean{

    const token = localStorage.getItem('token');
     let  token2 =token?token:'';

    if(this.jwtHelper.isTokenExpired(token2) || !localStorage.getItem('token')){
      return false;
    }



    return true;
  }



}
