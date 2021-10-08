import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertDialogComponent } from './../../alert-dialog/alert-dialog.component';
import { MaterialUtilizadoComponent } from './../material-utilizado/material-utilizado.component';
import { MatDialog } from '@angular/material/dialog';

import { Servicios } from './../../../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css'],

})
export class AgregarPedidoComponent implements OnInit {
  pageActual: number = 1;
  listaClientes:any[]=[];
  listaUsuarios:any[]=[];
  tableMateriales: any[] = [];
  tableDetallePedido: any[] = [];
  mostrarSigStep1:boolean= false;
  mostrarSigStep2:boolean= false;
  //pedido encabezado
  idPedido:number=0;
  usuarioAsignado:string='';
  cliente:string='';
  comentario:string='';
  direccion:string='';
  total:number=0;

  //Detalle
  listaProducto:any[]=[];
  producto:string='';
  comentarioProducto:string='';
  costoAdicional:number=0;
  costoInstalacion:number=0;
  descuento:number=0;
  monto:number=0;
  cantidad:number=0;
  necesitaMateriales:string='';
  nombreProducto:string='';



  //datos
   pedidoEncabezado:any ={};
  constructor(private servicios: Servicios,public dialog: MatDialog, private router: Router,   private spinner: NgxSpinnerService){

  }
  ngOnInit(): void {
   this.comboClientes();
   this.comboUsuarios();
   this.comboProductos();
  }

  limpiar(){
    this.producto='';
    this.comentarioProducto='';
    this.costoAdicional=0;
    this. costoInstalacion=0;
    this.descuento=0;
    this.monto=0;
    this. cantidad=0;
    this. necesitaMateriales='';
    this. nombreProducto='';
  }
  comboProductos(){
    this.listaProducto = [];
    let lista = this.servicios.getAllProducto();

    lista.forEach((element: any[]) => {
      element.forEach(e => {

        this.listaProducto.push({precio_predeterminado:e.precio_predeterminado, codigo: e.id, nombre: e.nombre});
      });
    });
  }
  comboClientes() {

    this.listaClientes = [];
    let lista = this.servicios.getAllCliente();

    lista.forEach((element: any[]) => {
      element.forEach(e => {

        this.listaClientes.push({ codigo: e.id, nombre: e.nombre});
      });
    });
  }

  comboUsuarios() {

    this.listaUsuarios = [];
    let lista = this.servicios.getAllUsuario();

    lista.forEach((element: any[]) => {
      element.forEach(e => {

        this.listaUsuarios.push({ codigo: e.usuario, nombre: e.nombre});
      });
    });
  }

  mostrarSiguiente1( cliente:string,usuarioAsignado:string,comentario:string ,direccion:string){

    if(cliente &&
    usuarioAsignado &&

    direccion  ){

      this.mostrarSigStep1=true;

    }

  }
  cancelar(){
    this.router.navigate(['pedido']);
  }
  guardarDatosIdentificacion(){

    if(!this.cliente &&
    !this.usuarioAsignado&&

    !this.direccion ){
      this.alerta('Por favor ingrese los datos solicitados','error');
      return ;
    }

    if(!this.cliente){
      this.alerta('Por favor ingrese un cliente','error');
      return ;
    }
    if(!this.usuarioAsignado){
      this.alerta('Por favor asigne un usuario','error');
      return ;
    }
    if(!this.direccion ){
      this.alerta('Por favor ingrese una dirección','error');
      return ;
    }
    this.pedidoEncabezado ={
      cliente_id:this.cliente,
      comentario:this.comentario,
      usuario_asignado:this.usuarioAsignado,
      direccion:this.direccion,
      total:this.total
    };



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
  guardarDetalle(){

    if(!this.producto){
      this.alerta('Por favor seleccione un producto','error');
      return;
    }


this.llenarMonto(this.producto);
this.monto=this.monto * this.cantidad;

let montoAdicional:number=this.monto+this.costoInstalacion+this.costoAdicional;
this.monto=this.monto+ montoAdicional;
this.monto=this.monto-this.descuento;

    this.tableDetallePedido.push({
      producto_id:this.producto,
      nombre:this.nombreProducto,
      comentario:this.comentario,
      costo_adicional:this.costoAdicional,
      costo_instalacion:this.costoInstalacion,
      descuento:this.descuento,
      cantidad:this.cantidad,
      monto:this.monto

    });

    this.limpiar();

  }

  llenarMonto(id:string){

    this.listaProducto.forEach(e => {
        if(e.codigo==id){
          this.monto=e.precio_predeterminado
          this.nombreProducto=e.nombre

        }
    });
  }

agregarMaterial(element:any){
  this.eliminarDetalle(element)
  const dialogRef = this.dialog.open(MaterialUtilizadoComponent, {

    data: {lista:element.listaMateriales}
  });

  dialogRef.afterClosed().subscribe(result => {

    element.listaMateriales=result

    this.tableDetallePedido.push(element)
  });

}
eliminarDetalle(element:any){
  var indice = this.tableDetallePedido.indexOf(element);
  this.tableDetallePedido.splice(indice, 1);
}


procesarPedido(){
  if(this.tableDetallePedido.length==0){
    this.alerta('Necesita agregar un producto para procesar el pedido','error');
    return;
  }
this.spinner.show();

this.tableDetallePedido.forEach(e => {
   this.total = this.total=e.monto;
});

this.pedidoEncabezado.total=this.total;

  let pedido={
    encabezado:this.pedidoEncabezado,
    detalle: this.tableDetallePedido
  }

  this.servicios.crearPedido(pedido).subscribe((res: any) => {


    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `Pedido Ingresado con exito`,
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: '',
      },
    });
    this.spinner.hide();
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {
          this.router.navigate(['pedido']);
        }
      }
    });
     });



}
}



