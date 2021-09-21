import { element } from 'protractor';
import { Servicios } from './../../../servicios/servicios.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-material-utilizado',
  templateUrl: './material-utilizado.component.html',
  styleUrls: ['./material-utilizado.component.css']
})
export class MaterialUtilizadoComponent implements OnInit {

  listaMateriales:any []=[];
  pageActual: number = 1;
  material:string='';
  cantidad:number=0;
  unidad_medida:string='';
  tableMatUtilizados:any []=[];
  constructor(private servicios: Servicios,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.comboMateriales();
  }

  comboMateriales(){
    this.listaMateriales = [];
    let lista = this.servicios.getAllMaterial();

    lista.forEach((element: any[]) => {
      element.forEach(e => {

        this.listaMateriales.push({ codigo: e.id, nombre: e.nombre});
      });
    });
  }

  agregar(){
    let nombre;
    this.listaMateriales.forEach(element => {
          if(element.codigo =this.material){
              nombre= element.nombre;
          }
    });
    this.tableMatUtilizados.push({nombre:nombre,material_id: this.material, cantidad:this.cantidad,unidad_medida:this.unidad_medida});
    this.data.lista=this.tableMatUtilizados;
  }
  eliminar(e:any){
    var indice = this.tableMatUtilizados.indexOf(e);
    this.tableMatUtilizados.splice(indice, 1);
  }

}
