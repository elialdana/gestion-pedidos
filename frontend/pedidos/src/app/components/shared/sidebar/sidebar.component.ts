import { AuthService } from './../../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent implements OnInit {

  constructor(private authService:AuthService) { }
  autenticado:boolean =false;
  ngOnInit() {
      this.autenticado = this.authService.isAuth();
  }

}
