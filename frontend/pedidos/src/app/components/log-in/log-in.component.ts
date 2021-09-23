import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
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
    private authService:AuthService,    private router: Router,    private spinner: NgxSpinnerService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    localStorage.removeItem("token");
  }



    validarUsuario() {
      this.spinner.show();


      if(!this.loginForm.value.username){
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: '',
            text: `Por favor ingrese el usuario`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
          },
        });
        this.spinner.hide();
        return;
      }

      if(!this.loginForm.value.password){
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: '',
            text: `Por favor ingrese contraseña`,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
          },
        });
        this.spinner.hide();
        return;
      }
      let password =crypto.SHA512(this.loginForm.value.password).toString();
     const login = {
        usuario: this.loginForm.value.username,
        password: password
      };

      this.authService.singin(login).subscribe((res:any)=>{
        if(!res.respuesta){
     this.dialog.open(AlertDialogComponent, {
            data: {
              title: '',
              text: `Usuario o contraseña invalidos`,
              icon: 'error',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
            },
          });
        }else{
          localStorage.setItem('token',res.token);
          this.router.navigate(['cliente']);
        }
     });
     this.spinner.hide();
    }



}
