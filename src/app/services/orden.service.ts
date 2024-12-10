import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environments } from '../environments/environments';
import { Client } from '../../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class OrdenService {

  constructor(
    private http:HttpClient
  ) {}

  private baseUrl = environments.backOrdenes + '/api/ordenes';

  // Obtener todas las órdenes
  listarOrdenesByClient(clientId: number) {
    return this.http.get(this.baseUrl + '/cliente/' + clientId);
  }

  getClientByEmail(email: string) {
    return this.http.get<Client>(environments.backOrdenes + '/api/checkout/cliente/email',{params: {email}});
  }
}
