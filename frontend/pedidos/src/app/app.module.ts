import { MaterialesComponent } from './components/materiales/materiales.component';
import { AgregarPedidoComponent } from './components/pedido/agregar-pedido/agregar-pedido.component';
import { ListaPedidoComponent } from './components/pedido/lista-pedido/lista-pedido.component';




import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { InterceptorService } from './servicios/interceptor.service';

import { ProductoComponent } from './components/producto/producto.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Providers
import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt'
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,

    ProductoComponent,
    AlertDialogComponent,
    ProveedorComponent,
    ClienteComponent,
    UsuarioComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ListaPedidoComponent,
    AgregarPedidoComponent,
    MaterialesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxPaginationModule
    ],
  providers: [

    // JWT
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    // Token interceptor
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
