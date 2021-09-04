import { AuthService } from './servicios/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pedidos';


  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.autenticado();

  }

  autenticado(){
    return this.authService.isAuth();
  }
}
