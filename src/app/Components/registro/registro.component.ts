import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { CiudadService } from 'src/services/ciudad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {
  ciudades: any[] = [];
  barrios: any[] = [];
  registroForm: UntypedFormGroup;

  constructor(private toastr: ToastrService,private fb: UntypedFormBuilder, private ciudadService: CiudadService) {
    this.registroForm = this.fb.group({
      tipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
      nombres: ['', Validators.required],
      segundoNombre: [''],
      apellidos: ['', Validators.required],
      segundoApellido: [''],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      barrio: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmacion: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.getCiudades();
    this.getBarrios();
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

  showSuccess(){
    Swal.fire({
      title: '¡Éxito!',
      text: 'La operación fue exitosa.',
      icon: 'success',
      confirmButtonText: '  Aceptar  ',
      customClass: {
        confirmButton: 'btn success'
      }
    });
  }

  cancelar(){

  }

  getCiudades(){
    this.ciudadService.getCiudades().subscribe({
      next: (data) => {
        this.ciudades = data;
      },
      error: (err) => {
        this.toastr.error('Error recuperando datos'+ err, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }

  getBarrios(){
    this.ciudadService.getBarrios().subscribe({
      next: (data) => {
        this.barrios = data;
      },
      error: (err) => {
        this.toastr.error('Error recuperando datos'+ err, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right',
        });
      }
    });
  }
}
