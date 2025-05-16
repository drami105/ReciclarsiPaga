import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from 'src/services/general.service';
import { PersonaService } from 'src/services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizacion',
  templateUrl: './actualizacion.component.html',
  styleUrls: ['./actualizacion.component.css']
})
export class ActualizacionComponent {
  ciudades: any[] = [];
  barrios: any[] = [];
  barriosFiltrados: any[] = [];

  constructor(private toastr: ToastrService, private fb: UntypedFormBuilder, private ciudadService: GeneralService, private personaService: PersonaService, private router: Router) {}



  ngOnInit(): void {
    this.getCiudades();
    this.getBarrios();
  }

    getCiudades() {
    this.ciudadService.getCiudades().subscribe({
      next: (data) => {
        this.ciudades = data;
      },
      error: (err) => {
        this.toastr.error('Error recuperando datos' + err, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  getBarrios() {
    this.ciudadService.getBarrios().subscribe({
      next: (data) => {
        this.barrios = data;
      },
      error: (err) => {
        this.toastr.error('Error recuperando datos' + err, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  filtrarBarrios(event: Event) {
    const idCiudadSeleccionada = (event.target as HTMLSelectElement).value;
    this.getBarrios();
    this.barriosFiltrados = this.barrios.filter(barrio => barrio.idCiudad === +idCiudadSeleccionada);
  }

}
