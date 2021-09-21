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
  { path: 'agregar-pedido', component: AgregarPedidoComponent ,canActivate: [AuthGuard]  },
  {path: 'login', component: LogInComponent},
  {path: 'producto', component: ProductoComponent,canActivate:[RoleGuard], data: { expectedRole: 'ADMIN' } },
  {path: 'proveedor', component: ProveedorComponent, canActivate:[RoleGuard], data: { expectedRole: 'ADMIN' } },
  {path: 'cliente', component: ClienteComponent,canActivate: [AuthGuard] },
  {path: 'usuario', component: UsuarioComponent,canActivate:[RoleGuard], data: { expectedRole: 'ADMIN' } },
  {path: 'pedido', component: ListaPedidoComponent,canActivate: [AuthGuard]  },
  {path: 'materiales', component: MaterialesComponent,canActivate:[RoleGuard], data: { expectedRole: 'ADMIN' } },
  /**
   * Rutas que no coincidan o sin ruta se redirige a la ruta raíz
   */
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
