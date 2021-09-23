import { Router } from '@angular/router';
import { AlertDialogComponent } from './../../alert-dialog/alert-dialog.component';
import { MaterialUtilizadoComponent } from './../material-utilizado/material-utilizado.component';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';
import { Servicios } from './../../../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css']
})
export class AgregarPedidoComponent implements OnInit {
  pageActual: number = 1;
  listaClientes:any[]=[];
  listaUsuarios:any[]=[];
  tableMateriales: any[] = [];
  tableDetallePedido: any[] = [];

  //pedido encabezado
  idPedido:number=0;
  usuarioAsignado:string='';
  cliente:string='';
  comentario:string='';
  direccion:string='';

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
   pedidoEncabezado ={};
  constructor(private servicios: Servicios,public dialog: MatDialog, private router: Router){

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

  guardarDatosIdentificacion(){

    this.pedidoEncabezado ={
      cliente_id:this.cliente,
      comentario:this.comentario,
      usuario_asignado:this.usuarioAsignado,
      direccion:this.direccion
    };



  }


  guardarDetalle(){
console.log('guardando detalle')
this.llenarMonto(this.producto);
this.monto=this.monto * this.cantidad;
this.monto=(this.monto+this.costoInstalacion+this.costoAdicional)-this.descuento;
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
          console.log(e)
        }
    });
  }

agregarMaterial(element:any){

  const dialogRef = this.dialog.open(MaterialUtilizadoComponent, {

    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.eliminarDetalle(element)
    element.listaMateriales=result
    console.log(element.listaMateriales);
    this.tableDetallePedido.push(element)
  });

}
eliminarDetalle(element:any){
  var indice = this.tableDetallePedido.indexOf(element);
  this.tableDetallePedido.splice(indice, 1);
}


procesarPedido(){
  let pedido={
    encabezado:this.pedidoEncabezado,
    detalle: this.tableDetallePedido
  }

  this.servicios.crearPedido(pedido).subscribe((res: any) => {
    console.log(res)

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



