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

  agregar(){
//agregar-pedido
this.router.navigate(['agregar-pedido']);
  }

  public  estado(estado:string){
    if('P'==estado){
      return 'Procesado';
    }

    return estado;
  }
}
