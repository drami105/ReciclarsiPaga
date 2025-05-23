import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from 'src/services/general.service';
import { PersonaService } from 'src/services/persona.service';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';

@Component({
  selector: 'app-actualizacion',
  templateUrl: './actualizacion.component.html',
  styleUrls: ['./actualizacion.component.css']
})
export class ActualizacionComponent {
  ciudades: any[] = [];
  barrios: any[] = [];
  barriosFiltrados: any[] = [];
  actualizaForm: UntypedFormGroup;
  resultStore: any = null;
  idUsuario: any = 0;

  constructor(private toastr: ToastrService, private fb: UntypedFormBuilder, private ciudadService: GeneralService, private personaService: PersonaService, private router: Router) {

    this.actualizaForm = this.fb.group({
      idPersona: [null],
      documento: { value: null, disabled: true },
      idTipoDocumento: [null],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      nombres: { value: '', disabled: true },
      idCiudad: [null],
      direccion: ['', Validators.required],
      idBarrio: [null, Validators.required],
      telefono: [null, [Validators.required, Validators.minLength(10)]],
    });

  }

  ngOnInit(): void {
    try {
      let data: string | null = localStorage.getItem('Data');
      if (data != null) {
        this.resultStore = JSON.parse(data)
        this.idUsuario = this.resultStore.idUsuario;

        this.getCiudades();
        this.getBarrios();
        this.getPersonaID(this.idUsuario);

      }
    } catch (error) {

    }
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

  filtrarBarrios() {
    const ciudad = this.actualizaForm.get('idCiudad')?.value;
    this.getBarrios();
    this.barriosFiltrados = this.barrios.filter(barrio => barrio.idCiudad === +ciudad);
  }

  getPersonaID(id: number): void {
    this.personaService.getPersonasId(id).subscribe(persona => {
      const nombreCompleto = `${persona.primerNombre ?? ''} ${persona.segundoNombre ?? ''} ${persona.primerApellido ?? ''} ${persona.segundoApellido ?? ''}`.trim();
      this.actualizaForm.patchValue({
        idPersona: persona.idPersona,
        documento: persona.documento,
        idTipoDocumento: persona.idTipoDocumento,
        primerNombre: persona.primerNombre,
        segundoNombre: persona.segundoNombre,
        primerApellido: persona.primerApellido,
        segundoApellido: persona.segundoApellido,
        nombres: nombreCompleto,
        direccion: persona.direccion,
        idBarrio: persona.idBarrio,
        idCiudad: persona.idCiudad,
        telefono: persona.telefono,
      });
      this.filtrarBarrios();
    });
  }

  actualizaDatos() {
    if (this.actualizaForm.get('documento')?.value == "" || this.actualizaForm.get('direccion')?.value == "" || this.actualizaForm.get('telefono')?.value == ""
      || this.actualizaForm.get('idBarrio')?.value == "" || this.actualizaForm.get('idBarrio')?.value == "0"
    ) {
      this.toastr.error('Hay campos obligatorios que se deben diligenciar, verifique. ', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } else {
      const {
        documento,
        idCiudad,
        idTipoDocumento,
        nombres,
        primerApellido,
        primerNombre,
        segundoApellido,
        segundoNombre,
        ...persona
      } = this.actualizaForm.value;

      persona.idBarrio = +persona.idBarrio;
      persona.telefono = +persona.telefono;


      this.personaService.actualizarPersona(persona.idPersona, persona)
        .subscribe({
          next: () => {
            this.toastr.success('Datos actualizados correctamente.', 'Exitoso', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          },
          error: err => {
            this.toastr.error('Ocurrió un error intentando actualizar los datos. ', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
    }

  }

}
