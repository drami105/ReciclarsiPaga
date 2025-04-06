import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log('Formulario enviado', this.registroForm.value);
      // Aquí puedes agregar tu lógica para enviar los datos a un servicio
    } else {
      console.log('Formulario no válido');
    }
  }

  cancelar(){

  }
}
