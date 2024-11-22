import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../../../../services/cupon/cupon.service';
import { Cupon } from '../../../../models/cupon.model';

@Component({
  selector: 'app-validar-cupon',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './validar-cupon.component.html',
  styleUrls: ['./validar-cupon.component.css']
})
export class ValidarCuponComponent {
  mensaje?: String;
  codigoCupon: string ='';
  cupones :Cupon[] = [];
  @Output() validacion = new EventEmitter<{ valido: boolean; descuento: number }>();


  constructor(private _cuponService: CuponService) { }

  ngOnInit() {
    this.cargarCupones();
  }

  cargarCupones() {
    this._cuponService.obtenerCupones().subscribe(cupones => {
      this.cupones = cupones; 
    });
  }


  validarCupon() {
    if (!this.codigoCupon.trim()) {
      this.mensaje = 'Por favor, ingrese un código de cupón.';
      return;
    }
    const cuponEncontrado = this.cupones.find(cuponObj => cuponObj.codigo === this.codigoCupon.toLowerCase());  
    if (!cuponEncontrado) {
      this.mensaje = 'Cupón inválido';
      return;
    }

    const fechaActual = new Date();

    if (fechaActual < cuponEncontrado.fechaInicio || fechaActual > cuponEncontrado.fechaFin) {
      this.mensaje = 'El cupón no se encuentra vigente.';
      return;
    }

    this.validacion.emit({ 
      valido: true,
      descuento: cuponEncontrado.descuento 
    });

    this.mensaje = 'Cupón validado con éxito.';
}

}
