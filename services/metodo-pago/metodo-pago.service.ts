import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../src/app/environments/environments';
import { Tarjeta } from '../../models/tarjeta.model';

@Injectable({providedIn: 'root'})
export class MetodoPagoService {
  constructor(
    private http:HttpClient
  ) { }

  private baseUrl = environments.backOrdenes + '/api/checkout';

  guardarMetodoPago(metodoPago: Tarjeta) {
    return this.http.post(this.baseUrl + '/payment-details', metodoPago);

  }

}
