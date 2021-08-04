
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {


  nombre:string='';
  codigo:string='';
  descripcion:string='';
  estado:string ='A';

  constructor(

    ) { }
  ngOnInit() {
  }

}
