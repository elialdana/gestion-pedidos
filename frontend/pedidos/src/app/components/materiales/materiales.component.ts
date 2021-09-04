import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Servicios } from './../../servicios/servicios.service';
import { AlertDialogComponent } from './../alert-dialog/alert-dialog.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {


  id: string = '';
  codigo: string = '';
  nombre: string = '';
  descripcion: string = '';
  precioVenta: string = '';
  precioCompra: string = '';
  stock: number=0;
  telefono: string = '';
  correo: string = '';
  estado: string = 'true';
  proveedor:string='';

  nombreBoton: string = 'Guardar';
  //VARIABLES Y OBJETOS
  nameAPP = 'MaterialS';
  tableModel: any[] = [];
  listaProveedores: any[] = [];
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
    this.comboProveedores();
    this.obtenerMaterials();
  }

  saveOrUpdate() {
    console.log('id', this.id);
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
          let Material = {
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion,
            estado: this.estado == 'true' ? 'A' : 'I',
            stock:this.stock,
            precio_venta: this.precioVenta,
            precio_compra:this.precioCompra,
            email_notificacion:this.correo,
            telefono_notificacion:this.telefono,
            proveedor_id:this.proveedor
          };

          this.servicios.saveMaterial(Material).subscribe((res: any) => {
            console.log(res)
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
  obtenerMaterials() {
    this.tableModel = [];
    this.servicios.getAllMaterial().subscribe((res: any) => {
      for (let element of res) {
        this.tableModel.push(element);
      }
    });
  }

  limpiar() {
    this.spinner.show();
    this.nombre = '';
    this.codigo = '';
    this.descripcion = '';
    this.estado = 'true';
    this.precioCompra = '';
    this.precioVenta = '';
    this.telefono='';
    this.correo='';
    this.nombreBoton = 'Guardar';
    this.id='';
    this.proveedor='';
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
          let Material = {
            id:this.id,
            codigo: this.codigo,
            nombre: this.nombre,
            descripcion: this.descripcion,
            estado: this.estado == 'true' ? 'A' : 'I',
            proveedor_id:this.proveedor,
            precio_venta: this.precioVenta,
            precio_compra:this.precioCompra,
            email_notificacion:this.correo,
            telefono_notificacion:this.telefono,

          };

          this.servicios.updateMaterial(Material, Material.id).subscribe((res: any) => {
            console.log('updateMaterial', res)
            this.obtenerMaterials();

            this.limpiar();
            this.dialogoInformacion(`Los datos se guardaron de forma exitosa`);
            this.spinner.hide();

          });

        }
      }
    });

  }

  seleccionaEditar(i: any): void {
    console.log('Material a modificar ', i)
    this.id = i.id;

    this.nombreBoton = 'Modificar';
    this.nombre = i.nombre;
    this.codigo = i.codigo;
    this.descripcion = i.descripcion;
    this.estado = i.estado == 'A' ? 'true' : 'false';
    this.precioCompra = i.precio_compra;
    this.precioVenta= i.precio_venta;


  }

  eliminar(i: any): void {
    let id = i.id;

    let dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        text: `¿Está seguro de eliminar el registro?`,
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
          this.servicios.deleteMaterial(id).subscribe((res: any) => {
            console.log('deleteMaterial', res)
            this.obtenerMaterials();
            this.dialogoInformacion('Transacción exitosa');
          });
        }
      }
    });

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


  comboProveedores() {

      this.listaProveedores = [];
      let lista = this.servicios.getAllProveedor();

      lista.forEach((element: any[]) => {
        element.forEach(e => {

          this.listaProveedores.push({ codigo: e.id, nombre: e.nombre});
        });
      });
    }

}


