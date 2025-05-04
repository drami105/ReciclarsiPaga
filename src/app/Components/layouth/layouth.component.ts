import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouth',
  templateUrl: './layouth.component.html',
  styleUrls: ['./layouth.component.css']
})
export class LayouthComponent {
  mostrarMenu = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.mostrarMenu = !this.router.url.includes('/layout/solicitud');
    });
  }

}
