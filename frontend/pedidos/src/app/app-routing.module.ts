import { UsuarioComponent } from './components/usuario/usuario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'login', component: LogInComponent},
  {path: 'producto', component: ProductoComponent,canActivate: [AuthGuard] },
  {path: 'proveedor', component: ProveedorComponent,canActivate: [AuthGuard] },
  {path: 'cliente', component: ClienteComponent,canActivate: [AuthGuard] },
  {path: 'usuario', component: UsuarioComponent,canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
