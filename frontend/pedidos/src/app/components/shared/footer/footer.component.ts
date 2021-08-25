import { AuthService } from './../../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',

})
export class FooterComponent implements OnInit {


  constructor(private authService:AuthService) { }
  autenticado:boolean =false;
  ngOnInit() {
      this.autenticado = this.authService.isAuth();
  }

}
