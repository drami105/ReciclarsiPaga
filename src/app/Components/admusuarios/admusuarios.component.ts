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
  selector: 'app-admusuarios',
  templateUrl: './admusuarios.component.html',
  styleUrls: ['./admusuarios.component.css']
})
export class AdmusuariosComponent {
  ciudades: any[] = [];
  barrios: any[] = [];
  barriosFiltrados: any[] = [];
  tiposDocumento: any[] = [];
  actualizaForm: UntypedFormGroup;
  resultStore: any = null;
  idUsuario: any = 0;
  dataUsuarios: any;

  constructor(private toastr: ToastrService, private fb: UntypedFormBuilder, private generalService: GeneralService, private personaService: PersonaService, private router: Router) {

    this.actualizaForm = this.fb.group({
      idPersona: [null],
      documento: { value: null },
      idTipoDocumento: [null],
      primerNombre: [''],
      segundoNombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      nombres: { value: '', disabled: true },
      idCiudad: [null],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      idBarrio: [null, Validators.required],
      telefono: [null, [Validators.required, Validators.minLength(10)]],
      idPerfil: [0, Validators.required]
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
        this.getTiposDocumento();
        this.consultarUsuarios();

      }
    } catch (error) {

    }
  }


  getCiudades() {
    this.generalService.getCiudades().subscribe({
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
    this.generalService.getBarrios().subscribe({
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
      const idPerfil = this.actualizaForm.get('idPerfil')?.value;
      const {
        nombres,
        ...persona
      } = this.actualizaForm.value;

      persona.idBarrio = +persona.idBarrio;
      persona.telefono = +persona.telefono;
      persona.documento = +persona.documento;

      this.personaService.actualizarPersonaCompleta(persona.idPersona,idPerfil, persona)
        .subscribe({
          next: () => {
            this.consultarUsuarios();
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

  getTiposDocumento() {
    this.generalService.getTiposDocumento().subscribe({
      next: (data) => {
        this.tiposDocumento = data;
      },
      error: (err) => {
        this.toastr.error('Error recuperando datos' + err, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  consultarUsuarios() {

    this.generalService.getUsuarios().subscribe({
      next: (data) => {
        this.dataUsuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });

  }

  editarUsuario(item: any){
    this.actualizaForm.patchValue(item);
  }

  eliminarUsuario(){

  }
}
