import { Injectable } from '@angular/core';
import { Cupon } from '../../models/cupon.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

  constructor(private http:HttpClient) { }


  private baseUrl = environments.backOrdenes+ '/api/checkout/discount';

  applyDiscount(cupon: Cupon): Observable<Cupon> {
    return this.http.post<Cupon>(this.baseUrl, cupon);
  }
}
