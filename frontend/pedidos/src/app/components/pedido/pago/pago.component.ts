import { NgxSpinnerService } from 'ngx-spinner';
import { AlertDialogComponent } from './../../alert-dialog/alert-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Servicios } from './../../../servicios/servicios.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  pageActual: number = 1;
  abono:number=0;
  descripcion:string='';
  tablePagos:any[]=[];
  constructor(private servicios: Servicios,@Inject(MAT_DIALOG_DATA) public data: any,   public dialog: MatDialog,
  private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.tablePagos=[];
    this.servicios.getAllPagos(this.data.id_padre).subscribe((res: any) => {
      for (let element of res) {
        this.tablePagos.push(element);
      }
    });
  }
  agregar(){
    this.spinner.show();

    let json={
      abono:this.abono,
      descripcion:this.descripcion,
      fecha_abono: new Date(),
      pedido_id: this.data.id_padre
    };


    this.servicios.savePago(json).subscribe((res: any) => {
       console.log(res)
       this.getAll();
       this.spinner.hide();
       this.dialog.open(AlertDialogComponent, {
        data: {
          title: '',
          text: `Pago agregado con exito`,
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Cerrar',
          cancelButtonText: 'Cancelar',
        },


    });
  });
  }
}
