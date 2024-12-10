import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CuponService } from '../../../../services/cupon/cupon.service';
import { Cupon } from '../../../../models/cupon.model';

@Component({
  selector: 'app-validar-cupon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validar-cupon.component.html',
  styleUrls: ['./validar-cupon.component.css']
})
export class ValidarCuponComponent implements OnInit {
  cuponForm: FormGroup;
  mensaje?: string;
  cupones: Cupon[] = [];
  mostrarMensaje: boolean = false;

  @Output() validacion = new EventEmitter<{ valido: boolean; descuento: number }>();

  constructor(private fb: FormBuilder, private _cuponService: CuponService) {
    this.cuponForm = this.fb.group({
      codigoCupon: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    // this.cargarCupones();
  }

  // cargarCupones() {
  //   this._cuponService.obtenerCupones().subscribe(cupones => {
  //     this.cupones = cupones;
  //   });
  // }

  validarCupon() {
    const codigo = this.cuponForm.get('codigoCupon')?.value.trim();

    if (!codigo) {
      this.mostrarMensaje = true;
      this.mensaje = 'Por favor, ingrese un código de cupón.';
      setTimeout(() => (this.mostrarMensaje = false), 3000);
      return;
    }

      this._cuponService.applyDiscount({codigo } as Cupon)
      .subscribe(
        (res:Cupon)=>{
          if(res){

                      this.mostrarMensaje = true;
                      this.mensaje = 'Cupón validado con éxito.';
                      setTimeout(() => (this.mostrarMensaje = false), 3000);

                      this.validacion.emit({
                        valido: true,
                        descuento: (res.nuevoTotal || 0)/100,
                      });
                      alert('Se ha aplicado el descuento exitosamente')

          }

        }
      )

    // const cuponEncontrado = this.cupones.find(cuponObj => cuponObj.codigo === codigo.toLowerCase());
    // if (!cuponEncontrado) {
    //   this.mostrarMensaje = true;
    //   this.mensaje = 'Cupón inválido.';
    //   setTimeout(() => (this.mostrarMensaje = false), 3000);
    //   return;
    // }

    // const fechaActual = new Date();
    // if (fechaActual < cuponEncontrado.fechaInicio || fechaActual > cuponEncontrado.fechaFin) {
    //   this.mostrarMensaje = true;
    //   this.mensaje = 'El cupón no se encuentra vigente.';
    //   setTimeout(() => (this.mostrarMensaje = false), 3000);
    //   return;
    // }


  }
}
