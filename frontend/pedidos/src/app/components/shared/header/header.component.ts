import { AuthService } from './../../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService  ,private router: Router) { }

  ngOnInit() {

  }
  loginOut(){
    this.authService.loginOut();
    this.router.navigate(['login']);
  }
}
