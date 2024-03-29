import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn : 'root'
})

export class Servicios {
   URL_API_BASE = environment.baseURL;
   
   URL_PRODUCTO= '/api/producto';
   URL_PROVEEDORES= '/api/proveedor';
   URL_CLIENTES=  '/api/cliente';
   URL_USUARIO= '/api/usuario';
   URL_PEDIDO= '/api/pedido';
   URL_MATERIALES=  '/api/materialesProveedor';
   URL_PAGO= '/api/pago';
   constructor(private http: HttpClient) { }

   getHeadders(){
    const httpOptions= {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'

      })
    };
    return httpOptions;
   }

//###################################################### SERVICIOS DE PRODUCTOS #############################################################################

  public saveProducto(json: Object) : Observable <any> {


    return this.http.post<any>(this.URL_PRODUCTO, json,this.getHeadders());
   }


  public updateProducto(json: Object, id:String) : Observable <any> {


    return this.http.put<any>(this.URL_PRODUCTO+'/'+id, json,this.getHeadders());
   }
   public getAllProducto() : Observable <any> {
    return this.http.get<any>(this.URL_PRODUCTO);
   }
   public deleteProducto( id:String) : Observable <any> {


    return this.http.post<any>(this.URL_PRODUCTO+'/'+id,{id:id}, this.getHeadders());
   }


   //###################################################### SERVICIOS DE PROVEEDORES #############################################################################
  public saveProveedor(json: Object) : Observable <any> {


    return this.http.post<any>(this.URL_PROVEEDORES, json,this.getHeadders());
   }


  public updateProveedor(json: Object, id:String) : Observable <any> {


    return this.http.put<any>(this.URL_PROVEEDORES+'/'+id, json,this.getHeadders());
   }
   public getAllProveedor() : Observable <any> {
    return this.http.get<any>(this.URL_PROVEEDORES);
   }
   public deleteProveedor( id:String) : Observable <any> {


    return this.http.delete<any>(this.URL_PROVEEDORES+'/'+id, this.getHeadders());
   }


   //###################################################### SERVICIOS DE CLIENTES #############################################################################
   public saveCliente(json: Object) : Observable <any> {


    return this.http.post<any>(this.URL_CLIENTES, json,this.getHeadders());
   }


  public updateCliente(json: Object, id:String) : Observable <any> {


    return this.http.put<any>(this.URL_CLIENTES+'/'+id, json,this.getHeadders());
   }
   public getAllCliente() : Observable <any> {
    return this.http.get<any>(this.URL_CLIENTES);
   }


   //###################################################### SERVICIOS DE USUARIO #############################################################################
   public saveUsuario(json: Object) : Observable <any> {


    return this.http.post<any>(this.URL_USUARIO, json,this.getHeadders());
   }


  public updateUsuario(json: Object, id:String) : Observable <any> {


    return this.http.put<any>(this.URL_USUARIO+'/'+id, json,this.getHeadders());
   }
   public getAllUsuario() : Observable <any> {
    return this.http.get<any>(this.URL_USUARIO);
   }
   public deleteUsuario( json:any) : Observable <any> {


    return this.http.post<any>(this.URL_USUARIO+'/desactivar' ,json,this.getHeadders());
   }
//###################################################### SERVICIOS DE PEDIDO #############################################################################
public getAllPedidos() : Observable <any> {
  return this.http.get<any>(this.URL_PEDIDO);
 }
 public crearPedido(json:any) : Observable <any> {
  return this.http.post<any>(this.URL_PEDIDO, json ,this.getHeadders());
 }

 public modificaPedido(json:any) : Observable <any> {

  return this.http.put<any>(this.URL_PEDIDO+"/"+json.id, json ,this.getHeadders());
 }
 public cancelarPedido(id:any) : Observable <any> {
  return this.http.delete<any>(this.URL_PEDIDO+'/'+id, this.getHeadders());
 }
 //###################################################### SERVICIOS DE MATERIALES #############################################################################

 public saveMaterial(json: Object) : Observable <any> {


  return this.http.post<any>(this.URL_MATERIALES, json,this.getHeadders());
 }


public updateMaterial(json: Object, id:String) : Observable <any> {


  return this.http.put<any>(this.URL_MATERIALES+'/'+id, json,this.getHeadders());
 }
 public getAllMaterial() : Observable <any> {
  return this.http.get<any>(this.URL_MATERIALES);
 }
 public deleteMaterial( id:String) : Observable <any> {


  return this.http.delete<any>(this.URL_MATERIALES+'/'+id, this.getHeadders());
 }


 //###################################################### SERVICIOS DE PAGOS #############################################################################


public savePago(json: Object) : Observable <any> {

  return this.http.post<any>(this.URL_PAGO, json,this.getHeadders());
 }


 public getAllPagos(idPadre:string) : Observable <any> {
  return this.http.get<any>(this.URL_PAGO+'/pedido/'+idPadre);
 }

}
