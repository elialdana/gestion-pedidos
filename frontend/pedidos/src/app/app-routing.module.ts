import { AuthGuard } from './guards/auth.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuAppComponent } from './components/menu-app/menu-app.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path: 'login', component: LogInComponent},
  {path: 'producto', component: ProductoComponent,canActivate: [AuthGuard] },
  {path: 'menu', component: MenuAppComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
