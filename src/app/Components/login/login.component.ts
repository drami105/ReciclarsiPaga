import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/services/persona.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(private toastr: ToastrService, private fb: UntypedFormBuilder, private personaService: PersonaService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(3)]],
    });
  }


  ngOnInit(): void {
  }

  ingresar() {

    if (this.loginForm.get('correo')?.value == "" || this.loginForm.get('contrasena')?.value == "") {
      this.toastr.error('Debe diligenciar usuario y contraseña, verifique. ', 'Error', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
      });
    } else {
      this.personaService.postAutenticacion(this.loginForm.get('correo')?.value , this.loginForm.get('contrasena')?.value ).subscribe({
        next: (respuesta) => {
          localStorage.setItem('Data', JSON.stringify(respuesta))
          this.router.navigate(['/layout']);
        },
        error: (err) => {
          const mensaje = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
          this.toastr.error('Error al iniciar sesión ' + mensaje, 'Error', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
          });
        }
      });
    }
  }
}


