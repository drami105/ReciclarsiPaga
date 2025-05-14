import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from 'src/services/general.service';
import { PersonaService } from 'src/services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {
  ciudades: any[] = [];
  barrios: any[] = [];
  barriosFiltrados: any[] = [];
  tiposDocumento: any[] = [];
  registroForm: UntypedFormGroup;

  constructor(private toastr: ToastrService, private fb: UntypedFormBuilder, private ciudadService: GeneralService, private personaService: PersonaService, private router: Router) {
    this.registroForm = this.fb.group({
      idTipoDocumento: [null, Validators.required],
      documento: [null, Validators.required],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      telefono: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      idCiudad: [null, Validators.required],
      idBarrio: [null, Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmacion: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.getCiudades();
    this.getBarrios();
    this.getTiposDocumento();
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario enviado', this.registroForm.value);

      // Aquí puedes agregar tu lógica para enviar los datos a un servicio
    } else {

    }
  }

  showSuccess1() {
    this.toastr.success('¡Operación exitosa!', 'Éxito', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    });
  }

  showSwall(titulo: string, mensaje: string, icon: number) {
    if (icon == 1) {
      Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'success',
        confirmButtonText: '  Aceptar  ',
        customClass: {
          confirmButton: 'btn success'
        }
      });
    } else {
      Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'warning',
        confirmButtonText: '  Aceptar  ',
        customClass: {
          confirmButton: 'btn success'
        }
      });
    }

  }

  cancelar() {

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

  getTiposDocumento() {
    this.ciudadService.getTiposDocumento().subscribe({
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

  filtrarBarrios(event: Event) {
    const idCiudadSeleccionada = (event.target as HTMLSelectElement).value;
    this.getBarrios();
    this.barriosFiltrados = this.barrios.filter(barrio => barrio.idCiudad === +idCiudadSeleccionada);
  }

  guardarPersona() {
    const {
      contrasena,
      confirmacion: confirmacion1,
      idCiudad: idCiudad1,
      ...persona
    } = this.registroForm.value;

    persona.idTipoDocumento = +persona.idTipoDocumento;
    persona.documento = +persona.documento;
    persona.idBarrio = +persona.idBarrio;
    persona.telefono = +persona.telefono;

    const {
      idTipoDocumento,
      documento,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      telefono,
      correo,
      direccion,
      idCiudad,
      idBarrio,
      confirmacion,
      ...usuario
    } = this.registroForm.value;


    if (this.registroForm.get('documento')?.value == "" || this.registroForm.get('primerNombre')?.value == "" || this.registroForm.get('primerApellido')?.value == ""
        || this.registroForm.get('correo')?.value == "" || this.registroForm.get('telefono')?.value == "" || this.registroForm.get('telefono')?.value == "direccion"
        || this.registroForm.get('contrasena')?.value == "" || this.registroForm.get('confirmacion')?.value == ""
        || this.registroForm.get('idBarrio')?.value == "" || this.registroForm.get('idBarrio')?.value == "0"
      ) {
      console.log(this.registroForm.value)
      this.toastr.error('Hay campos obligatorios por diligenciar, verifique. ', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } else {
      if (this.registroForm.get('contrasena')?.value !== this.registroForm.get('confirmacion')?.value) {
        this.toastr.error('La contraseña y la confirmación deben ser coincidir. ', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      } else {
        this.personaService.postPersona({ persona, usuario }).subscribe({
          next: (respuesta) => {
            this.showSwall('¡Exitoso!', 'El registro se ha completado con éxito. Bienvenido', 1);
            this.registroForm.reset();
            this.router.navigate(['/login']);
          },
          error: (err) => {
            const mensaje = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
            this.toastr.error('Error al guardar ' + mensaje, 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          }
        });
      }
    }
  }

}
