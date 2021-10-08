import { NgxSpinnerService } from 'ngx-spinner';
import { Servicios } from './../../servicios/servicios.service';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  id: string = '';
  dpi: string = '';
  nit: string = '';
  nombre: string = '';
  descripcion: string = '';
  telefono_uno: string = '';
  telefono_dos: string = '';
  correo_electronico: string = '';
  domicilio: string = '';

  nombreBoton: string = 'Guardar';
  //VARIABLES Y OBJETOS
  nameAPP = 'CLIENTES';
  tableModel: any[] = [];

  constructor(
    private servicios: Servicios,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,

  ) {


  }
  pageActual: number = 1;
  msg = '';
  err = '';
  hideUpdate = true;




  ngOnInit(): void {
    this.getAll();
  }

  saveOrUpdate() {
    if (this.id == null || this.id == '') {
      this.agregar();
    } else {
      this.modificar();
    }

  }


  agregar() {

    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de que desea guardar?`,
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {

          this.spinner.show();
          let request = {
            id:this.id,
            dpi:this.dpi,
            nit:this.nit,
            nombre:this.nombre,
            domicilio: this.domicilio,
            telefono_uno: this.telefono_uno,
            telefono_dos:  this.telefono_dos,
            correo_electronico: this.correo_electronico
          };

          this.servicios.saveCliente(request).subscribe((res: any) => {

            this.tableModel.push(res);

            this.dialog.open(AlertDialogComponent, {
              data: {
                title: '',
                text: `Los datos se guardaron de forma exitosa`,
                icon: 'success',
                showCancelButton: true,
                showConfirmButton: false,

                cancelButtonText: 'Cerrar',
              },
            });
          });
          this.limpiar();
          this.spinner.hide();
        }
      }

    });

  }
  getAll() {
    this.tableModel = [];
    this.servicios.getAllCliente().subscribe((res: any) => {
      for (let element of res) {
        this.tableModel.push(element);
      }
    });
  }

  limpiar() {
    this.spinner.show();
    this.nombre = '';
    this.dpi= '';
    this.nit= '';
    this.domicilio= '';
    this.telefono_uno = '';
    this.telefono_dos = '';
    this.correo_electronico = '';


    this.nombreBoton = 'Guardar';
    this.spinner.hide();
  }

  closeAlert(): void {
    this.msg = '';
    this.err = '';

  }

  modificar() {


    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de que desea modificar?`,
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.value) {
          this.spinner.show();
          let request = {
            id:this.id,
            dpi:this.dpi,
            nit:this.nit,
            nombre:this.nombre,
            domicilio: this.domicilio,
            telefono_uno: this.telefono_uno,
            telefono_dos:  this.telefono_dos,
            correo_electronico: this.correo_electronico

          };

          this.servicios.updateCliente(request, request.id).subscribe((res: any) => {

            this.getAll();

            this.limpiar();
            this.dialogoInformacion(`Los datos se guardaron de forma exitosa`);
            this.spinner.hide();

          });

        }
      }
    });

  }

  seleccionaEditar(i: any): void {
    this.nombreBoton = 'Modificar';
    this.id = i.id;
    this.dpi = i.dpi;
    this.nit = i.nit;
    this.nombre = i.nombre;
    this.domicilio = i.domicilio;
    this.telefono_uno = i.telefono_uno;
    this.telefono_dos = i.telefono_dos;
    this.correo_electronico = i.correo_electronico;



  }





  dialogoInformacion(text:string){
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: text,
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: false,

        cancelButtonText: 'Cerrar',
      },
    });

  }

}
