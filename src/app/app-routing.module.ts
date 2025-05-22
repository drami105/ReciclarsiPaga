import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { LayouthComponent } from './Components/layouth/layouth.component';
import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { BeneficiosComponent } from './Components/beneficios/beneficios.component';
import { ActualizacionComponent } from './Components/actualizacion/actualizacion.component';
import { AdmusuariosComponent } from './Components/admusuarios/admusuarios.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'layout', component: LayouthComponent,
  children: [
    { path: 'solicitud', component: SolicitudComponent },
    { path: 'beneficios', component: BeneficiosComponent },
    { path: 'actualizacion', component: ActualizacionComponent },
    { path: 'admusuarios', component: AdmusuariosComponent }
  ]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
