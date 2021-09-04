import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  usuario:string ='';
  password:string ='';
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
      // TODO: Use EventEmitter with form value
      console.log(this.loginForm.value);
    }

    validarUsuario() {
      let password =crypto.SHA512(this.loginForm.value.password).toString();
     const login = {
        usuario: this.loginForm.value.username,
        password: password
      };

      this.authService.singin(login).subscribe((res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(['cliente']);
     });

    }



}
