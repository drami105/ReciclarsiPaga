import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layouth',
  templateUrl: './layouth.component.html',
  styleUrls: ['./layouth.component.css']
})
export class LayouthComponent implements OnInit {
  mostrarMenu = true;
  resultStore : any = null;
  ubicacion : any = '';
  correo : any = '';

  ngOnInit(): void {
      try {
       let data : string | null = localStorage.getItem('Data');
        if(data != null){
          this.resultStore= JSON.parse(data)
          this.ubicacion=this.resultStore.direccion;
          this.correo=this.resultStore.correo;
        }else{
          this.router.navigateByUrl('/login')
          localStorage.clear()
        }
      } catch (error) {

      }
  }

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.mostrarMenu = !this.router.url.includes('/layout/solicitud');
    });
  }

  salir(){
    this.router.navigateByUrl('/login')
    localStorage.clear()
  }

}
