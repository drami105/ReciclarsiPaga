import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  puntosActuales: any = 0;
  aportesActuales: any = 0;
  resultStore: any = null;
  idUsuario: any = 0;
  idPerfil: any = 0;



  constructor(private generalService: GeneralService) { }


  ngOnInit(): void {
    try {
      let data: string | null = localStorage.getItem('Data');
      if (data != null) {
        this.resultStore = JSON.parse(data)
        this.idUsuario = this.resultStore.idUsuario;
        this.idPerfil = this.resultStore.idPerfil;
        this.cargarDatosUsuario();
      }
    } catch (error) {

    }
  }

  cargarDatosUsuario(): void {
    // Obtener puntos actuales
    this.generalService.getPuntosPorUsuario(this.idUsuario).subscribe({
      next: (puntos) => {
        this.puntosActuales = puntos;
      },
      error: (err) => {
        console.error('Error al obtener puntos:', err);
      }
    });
    this.generalService.getKilogramosConfPorUsuario(this.idUsuario).subscribe({
      next: (kilos) => {
        this.aportesActuales = kilos;
      },
      error: (err) => {
        console.error('Error al obtener aportes:', err);
      }
    });
  }

}
