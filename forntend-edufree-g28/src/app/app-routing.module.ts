import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path:'login', component: LoginComponent
  },
  {
    path:'programas-en-oferta', component: ProgramasEnOfertaComponent
  },
  {
    path: 'admin-usuarios', component: AdminUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
