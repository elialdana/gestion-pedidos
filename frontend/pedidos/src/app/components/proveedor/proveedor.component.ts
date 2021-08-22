import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Servicios } from './../../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  id: string = '';
  nombre: string = '';
  descripcion: string = '';
  telefono: string = '';
  correo_electronico: string = '';
  direccion: string = '';

  nombreBoton: string = 'Guardar';
  //VARIABLES Y OBJETOS
  nameAPP = 'PROVEEDORES';
  tableModel: any[] = [];

  constructor(
    private servicios: Servicios,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,

  ) {


  }
  pageActual: number = 1;
  msg = '';
  err = '';
  hideUpdate = true;




  ngOnInit(): void {
    this.getAll();
  }

  saveOrUpdate() {
    if (this.id == null || this.id == '') {
      this.agregar();
    } else {
      this.modificar();
    }

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

          this.spinner.show();
          let request = {
            id:this.id,
            nombre:this.nombre,
            descripcion: this.descripcion,
            telefono: this.telefono,
            correo_electronico: this.correo_electronico,
            direccion: this.direccion
          };

          this.servicios.saveProveedor(request).subscribe((res: any) => {
            console.log(res)
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
    this.servicios.getAllProveedor().subscribe((res: any) => {
      for (let element of res) {
        this.tableModel.push(element);
      }
    });
  }

  limpiar() {
    this.spinner.show();
    this.nombre = '';
    this.descripcion = '';
    this.telefono = '';
    this.correo_electronico = '';
    this.direccion = '';

    this.nombreBoton = 'Guardar';
    this.spinner.hide();
  }

  closeAlert(): void {
    this.msg = '';
    this.err = '';

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
            id:this.id,
            nombre:this.nombre,
            descripcion: this.descripcion,
            telefono: this.telefono,
            correo_electronico: this.correo_electronico,
            direccion: this.direccion
          };

          this.servicios.updateProveedor(request, request.id).subscribe((res: any) => {

            this.getAll();

            this.limpiar();
            this.dialogoInformacion(`Los datos se guardaron de forma exitosa`);
            this.spinner.hide();

          });

        }
      }
    });

  }

  seleccionaEditar(i: any): void {

    this.id = i.id;

    this.nombreBoton = 'Modificar';
    this.nombre = i.nombre;
    this.telefono = i.telefono;
    this.descripcion = i.descripcion;
    this.correo_electronico = i.correo_electronico;
    this.direccion = i.direccion;


  }

  eliminar(i: any): void {
    let id = i.id;

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
          this.servicios.deleteProveedor(id).subscribe((res: any) => {
            console.log('deleteProducto', res)
            this.getAll();
            this.dialogoInformacion('Transacción exitosa');
          });
        }
      }
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


}



