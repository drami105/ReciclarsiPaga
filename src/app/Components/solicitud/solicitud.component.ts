import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  @ViewChild('ModalSolicitudes', { static: true }) private ModalSolicitudes!: ElementRef;

  solicitudForm: UntypedFormGroup;
  resultStore: any = null;
  documento: any = '';
  nombres: any = '';
  correo: any = '';
  ubicacion: any = '';
  idUsuario: any = '';
  dataSolicitudes: any;

  constructor(private toastr: ToastrService, private fb: UntypedFormBuilder, private generalService: GeneralService) {
    this.solicitudForm = this.fb.group({
      documento: { value: null, disabled: true },
      nombres: { value: null, disabled: true },
      direccion: { value: null, disabled: true },

      idSolicitud: [0],
      idUsuario: [0],
      kilogramosIni: [0],
      observacion: [''],
      fechaSolicitud: [null],
      estado: [false],
      fechaRecoleccion: [null],
      kilogramosConf: [0],
      idUsuarioRecole: [0]
    });
  }


  ngOnInit(): void {
    try {
      let data: string | null = localStorage.getItem('Data');
      if (data != null) {
        this.resultStore = JSON.parse(data)
        this.documento = this.resultStore.documento;
        this.nombres = this.resultStore.nombreCompleto;
        this.ubicacion = this.resultStore.direccion;
        this.idUsuario = this.resultStore.idUsuario;

        this.solicitudForm.patchValue({
          documento: this.documento,
          nombres: this.nombres,
          direccion: this.ubicacion,
        });


      }
    } catch (error) {

    }
  }

  solicitud() {
    if (this.solicitudForm.get('kilogramosIni')?.value < 5) {
          this.toastr.error('Error al enviar solicitud, la cantidad mínima para solicitud de recolección es 5 Kg.', 'Error', {
            timeOut: 4000,
            positionClass: 'toast-bottom-right',
          });
    } else {
      this.solicitudForm.patchValue({
        idUsuario: this.idUsuario
      });

      const {
        documento,
        nombre,
        direccion,
        idSolicitud,
        ...solicitud
      } = this.solicitudForm.value;


      this.generalService.postRecoleccion(solicitud).subscribe({
        next: (respuesta) => {
          this.toastr.success('Solicitud de recolección enviada con éxito', 'Exitoso', {
            timeOut: 4000,
            positionClass: 'toast-bottom-right',
          });

          this.ModalSolicitudes.nativeElement.click();

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
consultarSolicitudes(){

  this.generalService.getSolicitudes(this.idUsuario).subscribe({
  next: (data) => {
    this.dataSolicitudes = data;
  },
  error: (err) => {
    console.error('Error al cargar solicitudes:', err);
  }
});

}

}
