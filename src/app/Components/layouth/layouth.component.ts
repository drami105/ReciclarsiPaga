import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layouth',
  templateUrl: './layouth.component.html',
  styleUrls: ['./layouth.component.css']
})
export class LayouthComponent implements OnInit {
  mostrarMenu = true;
  resultStore: any = null;
  ubicacion: any = '';
  correo: any = '';

  ngOnInit(): void {
    try {
      let data: string | null = localStorage.getItem('Data');
      if (data != null) {
        this.resultStore = JSON.parse(data)
        this.ubicacion = this.resultStore.direccion;
        this.correo = this.resultStore.correo;

        this.evaluarRuta(this.router.url); // Evaluación inicial

        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
          const navigation = event as NavigationEnd;
          this.evaluarRuta(navigation.urlAfterRedirects);
        });

    } else {
      this.router.navigateByUrl('/login')
      localStorage.clear()
    }
  } catch(error) {

  }
}

constructor(private router: Router) { }

  private evaluarRuta(url: string): void {
  const rutasSinMenu = [
    '/layout/solicitud',
    '/layout/beneficios',
    '/layout/actualizacion',
    '/layout/admusuarios'
  ];

  this.mostrarMenu = !rutasSinMenu.includes(url);
}

salir() {
  this.router.navigateByUrl('/login')
  localStorage.clear()
}

}
