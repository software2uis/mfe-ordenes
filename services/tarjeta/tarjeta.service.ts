import { Injectable } from '@angular/core';
import { Tarjeta } from '../../models/tarjeta.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private apiUrl = 'http://192.168.193.90:8100/api/checkout';

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: Tarjeta): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.apiUrl+ '/payment-details', tarjeta);
  }

}
