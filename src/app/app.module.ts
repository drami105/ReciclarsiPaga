import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { LayouthComponent } from './Components/layouth/layouth.component';
import { MenuComponent } from './Components/menu/menu.component';
import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { HttpClientModule } from '@angular/common/http';
import { BeneficiosComponent } from './Components/beneficios/beneficios.component';
import { ActualizacionComponent } from './Components/actualizacion/actualizacion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    LayouthComponent,
    MenuComponent,
    SolicitudComponent,
    BeneficiosComponent,
    ActualizacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
