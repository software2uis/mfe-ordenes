import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pedido } from '../../models/pedido';
import { Producto } from '../../models/producto.model';
import { environments } from '../../src/app/environments/environments.prod';
import { OrdenDTO } from '../../models/orden.model';


@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = environments.backOrdenes + '/api/ordenes/cliente/';



  constructor(private http: HttpClient) {}

  enviarPedido(pedido: OrdenDTO,  idCliente:number): Observable<any> {


    pedido.ciudadEnvio = 'Bogota';
    pedido.direccionEnvio = 'Calle 123';
    pedido.costoEnvio = 10;
    pedido.descuentoAplicado= 20.0;
    pedido.tiempoEstimadoEntrega = "2 dias";
    pedido.codigoPostalEnvio = "11001";

    return this.http.post(this.apiUrl + idCliente, pedido, {params:{metodoPagoTipo : 'TARJETA_CREDITO'}});
  }

}
