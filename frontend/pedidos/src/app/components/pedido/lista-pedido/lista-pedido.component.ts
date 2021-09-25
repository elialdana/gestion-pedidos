import { PagoComponent } from './../pago/pago.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Servicios } from './../../../servicios/servicios.service';
import { AlertDialogComponent } from './../../alert-dialog/alert-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pedido',
  templateUrl: './lista-pedido.component.html',
  styleUrls: ['./lista-pedido.component.css']
})
export class ListaPedidoComponent implements OnInit {

  constructor(
    private servicios: Servicios,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private router: Router

  ) {


  }




  tableModel: any[] = [];


  pageActual: number = 1;
  msg = '';
  err = '';
  hideUpdate = true;




  ngOnInit(): void {
    this.getAll();
  }




  getAll() {
    this.tableModel = [];
    this.servicios.getAllPedidos().subscribe((res: any) => {
      for (let element of res) {
        this.tableModel.push(element);
      }
    });
  }

  agregar() {
    //agregar-pedido
    this.router.navigate(['agregar-pedido']);
  }

  public estado(estado: string) {
    if ('P' == estado) {
      return 'Procesado';
    }
    if ('I' == estado) {
      return 'Ingresado';
    }
    if ('C' == estado) {
      return 'Cancelado';
    }
    if ('T' == estado) {
      return 'Finalizado';
    }
    return estado;
  }


  cancelar(e: any) {
    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de cancelar el pedido?`,
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {
          this.servicios.cancelarPedido(e.id).subscribe((res: any) => {


            this.getAll();
            this.dialog.open(AlertDialogComponent, {
              data: {
                title: '',
                text: `Pedido cancelado con exito`,
                icon: 'question',
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Cerrar',
                cancelButtonText: 'Cancelar',
              },
            });

          });
        }
      }
    });
  }

  pago(e: any) {


    const dialogRef = this.dialog.open(PagoComponent, {

      data: { id_padre: e.id }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }



}
