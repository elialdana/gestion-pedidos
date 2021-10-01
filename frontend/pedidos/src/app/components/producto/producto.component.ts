import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Servicios } from './../../servicios/servicios.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  id: string = '';
  nombre: string = '';
  codigo: string = '';
  descripcion: string = '';
  estado: string = 'true';
  calculaPrecio: string = 'true';
  precio: string = '';
  nombreBoton: string = 'Guardar';
  //VARIABLES Y OBJETOS
  nameAPP = 'PRODUCTOS';
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
    this.obtenerProductos();
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
          let producto = {
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion,
            estado: this.estado == 'true' ? 'A' : 'I',
            calcular_precio: this.calculaPrecio == 'true' ? 'S' : 'N',
            precio_predeterminado: this.precio
          };

          this.servicios.saveProducto(producto).subscribe((res: any) => {
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
  obtenerProductos() {
    this.tableModel = [];
    this.servicios.getAllProducto().subscribe((res: any) => {
      for (let element of res) {
        this.tableModel.push(element);
      }
    });
  }

  limpiar() {
    this.spinner.show();
    this.nombre = '';
    this.codigo = '';
    this.descripcion = '';
    this.estado = 'true';
    this.calculaPrecio = 'true';
    this.precio = '';
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
          let producto = {
            id: this.id,
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion,
            estado: this.estado == 'true' ? 'A' : 'I',
            calcular_precio: this.calculaPrecio == 'true' ? 'S' : 'N',
            precio_predeterminado: this.precio
          };

          this.servicios.updateProducto(producto, producto.id).subscribe((res: any) => {
            console.log('updateProducto', res)
            this.obtenerProductos();

            this.limpiar();
            this.dialogoInformacion(`Los datos se guardaron de forma exitosa`);
            this.spinner.hide();

          });

        }
      }
    });

  }

  seleccionaEditar(i: any): void {
    console.log('producto a modificar ', i)
    this.id = i.id;

    this.nombreBoton = 'Modificar';
    this.nombre = i.nombre;
    this.codigo = i.codigo;
    this.descripcion = i.descripcion;
    this.estado = i.estado == 'A' ? 'true' : 'false';
    this.calculaPrecio = i.calcular_precio == 'A' ? 'true' : 'false';
    this.precio = i.precio_predeterminado;

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
          this.servicios.deleteProducto(id).subscribe((res: any) => {
            console.log('deleteProducto', res)
            this.obtenerProductos();
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

  textEstado(estado:string){
    if('A'== estado){

      return 'Activo';
    }
    else{

      return 'Inactivo';
    }
  }
}











