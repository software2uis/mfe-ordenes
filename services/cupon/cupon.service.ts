import { Injectable } from '@angular/core';
import { Cupon } from '../../models/cupon.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor() { }

  obtenerCupones(): Observable<Cupon[]> {
    const cupones: Cupon[] = [
      { codigo: 'cupon1', fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2024-12-31'), descuento: 0.1, categorias: [] },
      { codigo: 'cupon2', fechaInicio: new Date('2024-11-01'), fechaFin: new Date('2025-01-31'), descuento: 0.2, categorias: [] },
      { codigo: 'cupon3', fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2025-02-28'), descuento: 0.3, categorias: [] },
      { codigo: 'cupon4', fechaInicio: new Date('2024-12-01'), fechaFin: new Date('2025-03-31'), descuento: 0.4, categorias: [] },
      { codigo: 'cupon5', fechaInicio: new Date('2025-12-15'), fechaFin: new Date('2025-04-30'), descuento: 0.5, categorias: [] }
    ];
    
    return of(cupones); 
  }
}
