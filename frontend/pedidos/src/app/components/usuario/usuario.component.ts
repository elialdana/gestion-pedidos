import { NgxSpinnerService } from 'ngx-spinner';
import { Servicios } from './../../servicios/servicios.service';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as crypto from 'crypto-js';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: string = '';
  dpi: string = '';
  password: string = '';
  nombre: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  perfil: string = 'TECNICO';
  foto: string = '';

  cambioPass: boolean = false;
  nombreBoton: string = 'Guardar';
  //VARIABLES Y OBJETOS
  nameAPP = 'USUARIOS';
  tableModel: any[] = [];

  constructor(
    private servicios: Servicios,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,

  ) {


  }
  pageActual: number = 1;

  hideUpdate = true;




  ngOnInit(): void {
    this.getAll();
  }

  saveOrUpdate() {
    if(!this.validaciones()){
        return;
    }
    if (this.nombreBoton ==  'Guardar') {
      this.agregar();
    } else {
      this.modificar();
    }

  }

  alerta(mensaje:string,icon:string){

    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: mensaje,
        icon: icon,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

  }
validaciones(){
  if(!this.dpi && this.dpi.trim().length==0 &&
  !this.nombre && this.nombre.trim().length==0&&
  !this.usuario && this.usuario.trim().length==0&&
  !this.direccion && this.direccion.trim().length==0
  ){
    this.alerta('Por favor ingrese los datos solicitados','error');
    return false;
  }
    if(!this.dpi && this.dpi.trim().length==0){

        this.alerta('Por favor ingrese DPI','error');
      return false;
    }

    if(!this.nombre && this.nombre.trim().length==0){

      this.alerta('Por favor ingrese nombre','error');
    return false;
    }

    if(!this.usuario && this.usuario.trim().length==0){

      this.alerta('Por favor ingrese usuario','error');
    return false;
    }
    if(!this.direccion && this.direccion.trim().length==0){

      this.alerta('Por favor ingrese dirección','error');
    return false;
    }
    return true;
}
  agregar() {

    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de que desea guardar?`,
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {

          this.password =crypto.SHA512(this.dpi).toString();

          this.spinner.show();
          let request = {
            usuario:this.usuario,
            dpi:this.dpi,
            password: this.password,

            nombre:this.nombre,
            direccion:this.direccion,
            telefono:this.telefono,
            perfil:this.perfil,
            foto:this.foto,
            estado:'A'
          };

          this.servicios.saveUsuario(request).subscribe((res: any) => {

            this.tableModel.push(res);

            this.dialog.open(AlertDialogComponent, {
              data: {
                title: '',
                text: `Los datos se guardaron de forma exitosa`,
                icon: 'success',
                showCancelButton: true,
                showConfirmButton: false,

                cancelButtonText: 'Cerrar',
              },
            });
          });
          this.limpiar();
          this.spinner.hide();
        }
      }

    });

  }
  getAll() {
    this.tableModel = [];
    this.servicios.getAllUsuario().subscribe((res: any) => {
      for (let element of res) {
        this.tableModel.push(element);
      }
    });
  }

  limpiar() {
    this.spinner.show();

    this.usuario='';
    this.dpi='';
    this.password='';
    this.nombre='';
    this.direccion='';
    this.telefono='';
    this.perfil='';
    this.foto='';
    this.nombreBoton = 'Guardar';
    this.spinner.hide();
  }



  modificar() {


    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de que desea modificar?`,
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {
          this.spinner.show();
          let request = {
            usuario:this.usuario,
            dpi:this.dpi,
            password:this.password,

            nombre:this.nombre,
            direccion:this.direccion,
            telefono:this.telefono,
            perfil:this.perfil,
            foto:this.foto
          };

          this.servicios.updateUsuario(request, request.usuario).subscribe((res: any) => {

            this.getAll();

            this.limpiar();
            this.dialogoInformacion(`Los datos se guardaron de forma exitosa`);
            this.spinner.hide();

          });

        }
      }
    });

  }

  seleccionaEditar(user: any): void {


    this.nombreBoton = 'Modificar';
    this.usuario=user.usuario;
    this.dpi= user.dpi;
    this.password=user.password;
    this.nombre=user.nombre;
    this.direccion=user.direccion;
    this.telefono=user.telefono;
    this.email=user.email;
    this.perfil=user.perfil;
    this.foto=user.foto;


  }

  eliminar(i: any): void {


    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de eliminar el registro?`,
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {
          this.servicios.deleteUsuario(i).subscribe((res: any) => {

            this.getAll();
            this.dialogoInformacion('Transacción exitosa');
          });
        }
      }
    });

  }

 seleccionaCambioPass(i: any): void {
      this.usuario= i.usuario;

      this.cambioPass=true;
 }

 accionCambioPass(){

   if(!this.password){
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: 'Por favor ingrese la nueva contraseña',
        icon: 'error',
        showCancelButton: true,
        showConfirmButton: false,

        cancelButtonText: 'Cerrar',
      },
    });
    return;
   }
 let  request={
  usuario:this.usuario,
  password: crypto.SHA512(this.password).toString()
 }


  this.servicios.updateUsuario(request, this.usuario).subscribe((res: any) => {


    this.cambioPass=false;
    this.limpiar();
    this.dialogoInformacion(`Cambio de contraseña exitoso`);
    this.spinner.hide();

  });

 }

  dialogoInformacion(text:string){
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: text,
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: false,

        cancelButtonText: 'Cerrar',
      },
    });

  }


  textEstado(estado:string){
    if('A'== estado){

      return 'Activo';
    }
    else{

      return 'Inactivo';
    }
  }

}
