import { AlertDialogComponent } from './../../alert-dialog/alert-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Servicios } from './../../../servicios/servicios.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.component.html',
  styleUrls: ['./modificar-pedido.component.scss']
})
export class ModificarPedidoComponent implements OnInit {
  listaUsuarios:any[]=[];
  comentario:string='';
  constructor(private servicios: Servicios,@Inject(MAT_DIALOG_DATA) public data: any,   public dialog: MatDialog,
  private spinner: NgxSpinnerService) { }
  ngOnInit() {

    this.listaUsuarios = [];
    let lista = this.servicios.getAllUsuario();

    lista.forEach((element: any[]) => {
      element.forEach(e => {

        this.listaUsuarios.push({ codigo: e.usuario, nombre: e.nombre});
      });
    });
  }


  modifica(){
this.spinner.show();
    this.servicios.modificaPedido(this.data.pedido).subscribe((res: any) => {
      console.log(res)

      this.spinner.hide();
       this.dialog.open(AlertDialogComponent, {
        data: {
          title: '',
          text: `Pedido modificado con exito`,
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: '',
        },
      });
    });


}
}
