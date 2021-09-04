import { Servicios } from './../../../servicios/servicios.service';
import { Component, OnInit } from '@angular/core';

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
  usuarioAsignado:string='';
  cliente:string='';
  constructor(private servicios: Servicios){

  }
  ngOnInit(): void {
   this.comboClientes();
   this.comboUsuarios();
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

    this.listaClientes = [];
    let lista = this.servicios.getAllUsuario();

    lista.forEach((element: any[]) => {
      element.forEach(e => {

        this.listaUsuarios.push({ codigo: e.usuario, nombre: e.nombre});
      });
    });
  }

  guardarDatosIdentificacion(){


  }
}



