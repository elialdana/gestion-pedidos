import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {

  //VARIABLES Y OBJETOS
  nameAPP = 'Quejas y Denuncias/Ingreso de queja por mal servicio o servicio no conforme';




  constructor(

    private fb: FormBuilder,
    private formBuild: FormBuilder
  ) {


  }

  onSubmit() {

  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);

  }

  ngOnInit(): void {
   // this.obtenerTiposQuejas();

  }



  }



