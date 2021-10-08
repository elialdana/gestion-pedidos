import { AuthService } from './../servicios/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import  decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  usuario:string='';
  nombre:string='';
  perfil:string='';
  constructor(
    private authService: AuthService,
    public router: Router
  ){ }
  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data.expectedRole;
    let token:any =localStorage.getItem('token');

    let data:any= decode(token);



    if( !this.authService.isAuth() || data.perfil !== expectedRole){
        localStorage.removeItem('token');
        this.router.navigate(['login']);


      return false;
    }
    return true;
  }

}
