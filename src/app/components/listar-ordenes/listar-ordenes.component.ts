import { Component, inject, OnInit } from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import { OrdenService } from '../../services/orden.service';
import { map, of, switchMap, tap } from 'rxjs';
import { Client } from '../../../../models/client.model';
import { Router } from '@angular/router';
import { Item, OrdenDTO, OrdenProduct } from '../../../../models/orden.model';

@Component({
  selector: 'app-listar-ordenes',
  templateUrl: './listar-ordenes.component.html',
  styleUrls: ['./listar-ordenes.component.css'],
  imports: [
    CurrencyPipe,
    DatePipe,
    CommonModule,
    NgClass
  ],
  standalone: true
})
export class ListarOrdenesComponent implements OnInit {
  ordenes: OrdenDTO[] = [];
  productos : OrdenProduct[] = [];


  user: string | null = null;
  router = inject(Router)

  constructor(private ordenService: OrdenService) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('username');
    if(this.user){
      this.ordenService.getClientByEmail(this.user).
      pipe(
        map((client: Client) => client.id as number),
        switchMap((clientId: number) =>
          this.ordenService.listarOrdenesByClient(clientId)
        ),
        tap(
          (ordenes: any) => {
            this.ordenes = ordenes
            this.productos = ordenes.map((orden: OrdenDTO, index: number) => { return {estado: orden.estado, total: orden.total, fechaCreacion :orden.fechaCreacion , ...orden.items[index]}} );
            console.log( this.productos);
          }
        )

      ).subscribe();
    }else{
      this.router.navigateByUrl('/login');
    }

  }

}
