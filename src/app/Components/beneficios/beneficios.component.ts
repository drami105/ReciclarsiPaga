import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

interface Beneficio {
  imagen: string;
  titulo: string;
  puntos: number;
}

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.css']
})

export class BeneficiosComponent implements OnInit{

  beneficios : Beneficio[] =  [
    {
      imagen: '../../../assets/beneficios/1.png',
      titulo: 'Premio 1',
      puntos: 500
    },
    {
      imagen: '../../../assets/beneficios/2.png',
      titulo: 'Premio 2',
      puntos: 800
    },
    {
      imagen: '../../../assets/beneficios/3.png',
      titulo: 'Premio 3',
      puntos: 1200
    },
    {
      imagen: '../../../assets/beneficios/3.png',
      titulo: 'Premio 4',
      puntos: 1200
    }
    // Puedes agregar más elementos
  ];

  visibleBeneficios: Beneficio[] = [];
  currentStartIndex = 0;
  currentOffset = 0; // en porcentaje
  puntosUsuario = 0;

  ngOnInit(): void {
    this.updateVisibleBeneficios();
  }

  updateVisibleBeneficios() {
    this.visibleBeneficios = [
      this.beneficios[(this.currentStartIndex) % this.beneficios.length],
      this.beneficios[(this.currentStartIndex + 1) % this.beneficios.length],
      this.beneficios[(this.currentStartIndex + 2) % this.beneficios.length],
    ];
    this.currentOffset = 0;
  }

  scrollRight() {
    this.currentStartIndex = (this.currentStartIndex + 1) % this.beneficios.length;
    this.updateVisibleBeneficios();
  }

  scrollLeft() {
    this.currentStartIndex =
      (this.currentStartIndex - 1 + this.beneficios.length) % this.beneficios.length;
    this.updateVisibleBeneficios();
  }

}
