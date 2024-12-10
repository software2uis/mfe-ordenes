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
  private apiUrlCaro =  environments.backCarrito + '/api/cart';
  private apiUrlOrdenes = environments.backOrdenes + '/api/ordenes/cliente/';


  constructor(private http: HttpClient) {}

  enviarPedido(pedido: OrdenDTO,  idCliente:number): Observable<any> {









    return this.http.post(this.apiUrlOrdenes + idCliente, pedido, {params:{metodoPagoTipo : 'TARJETA_CREDITO'}});
  }
obtenerProductos(username:string): Observable<Producto[]> {

  return this.http.get<Producto[]>(this.apiUrlCaro + '/contents', { params: { username } });
}

eliminarProductos(username:string, productId:string){
  return this.http.delete(this.apiUrlCaro + '/remove/' + productId, {params:{username}});
}

  }
