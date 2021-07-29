import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  //variables

  estado: string = 'A';
  nombre: string = '';
  descripcion: string = '';
  constructor() { }

  ngOnInit() {
  }

}
