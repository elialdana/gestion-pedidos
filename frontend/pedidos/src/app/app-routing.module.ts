import { RoleGuard } from './guards/role.guard';
import { AgregarPedidoComponent } from './components/pedido/agregar-pedido/agregar-pedido.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { ListaPedidoComponent } from './components/pedido/lista-pedido/lista-pedido.component';

import { UsuarioComponent } from './components/usuario/usuario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'agregar-pedido', component: AgregarPedidoComponent },
  {path: 'login', component: LogInComponent},
  {path: 'producto', component: ProductoComponent},//canActivate:[RoleGuard], data: { expectedRole: 'admin' } },
  {path: 'proveedor', component: ProveedorComponent},// canActivate:[RoleGuard], data: { expectedRole: 'admin' } },
  {path: 'cliente', component: ClienteComponent},//,canActivate: [AuthGuard] },
  {path: 'usuario', component: UsuarioComponent},//,canActivate:[RoleGuard], data: { expectedRole: 'admin' } },
  {path: 'pedido', component: ListaPedidoComponent},//,canActivate: [AuthGuard]  },
  {path: 'materiales', component: MaterialesComponent}//,canActivate:[RoleGuard], data: { expectedRole: 'admin' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
