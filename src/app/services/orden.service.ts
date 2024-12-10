import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { environments } from '../environments/environments';

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
}
