import { AuthService } from './../../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent implements OnInit {

  usuario:string='';
  nombre:string='';
  perfil:string='';
  constructor(private authService:AuthService ) { }


  ngOnInit() {
    this.getUsuarioLogeado();
  }


  getUsuarioLogeado(){
    let token:any =localStorage.getItem('token');

    let data:any= decode(token);
    this.usuario=data;
    this.perfil=data.perfil;
    this.nombre=data.nombre;
    console.log('usuario',data);
  }

  validaRol(rol:string){

    let token:any =localStorage.getItem('token');

    let data:any= decode(token);

    if(  data.perfil !== rol){
      return false;
  }
  return true;
}
}
