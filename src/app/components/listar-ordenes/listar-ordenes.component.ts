import { Component, OnInit } from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import { OrdenService } from '../../services/orden.service';

@Component({
  selector: 'app-listar-ordenes',
  templateUrl: './listar-ordenes.component.html',
  styleUrls: ['./listar-ordenes.component.css'],
  imports: [
    CurrencyPipe,
    DatePipe,
    NgClass
  ],
  standalone: true
})
export class ListarOrdenesComponent implements OnInit {
  ordenes: any[] = [];

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenService.listarOrdenesByClient(1).subscribe((ordenes: any) => this.ordenes = ordenes );
  }
}
