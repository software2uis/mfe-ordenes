import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Pedido } from '../../models/pedido';
import { Producto } from '../../models/producto.model';


@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrlCaro = 'http://192.168.193.90:8090/api/cart'; 
  private apiUrl = 'http://192.168.193.90:8090/api/cart'; 
 

  constructor(private http: HttpClient) {}

  enviarPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.apiUrl, pedido);
  }
obtenerProductos(): Observable<Producto[]> {

  const username = 'pepe'; 
  return this.http.get<Producto[]>(this.apiUrlCaro + '/contents', { params: { username } });
}

  }