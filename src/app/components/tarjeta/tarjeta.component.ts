import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tarjeta } from '../../../../models/tarjeta.model';
import { MetodoPagoService } from '../../../../services/metodo-pago/metodo-pago.service';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
})
export class TarjetaComponent  {
  tarjetaForm: FormGroup;
  mensaje: string = '';
  mostrarMensaje: boolean = false;
  @Output() tarjetaGuardada = new EventEmitter<void>();
  tarjeta: Tarjeta = {};

  private datosTarjetaMock = {
    nombreTitular: 'Juan Perez',
    numeroTarjeta: '1234567890123456',
    fechaExpiracion: '12/25'
  };

  constructor(private fb: FormBuilder, private metodoPagoService:MetodoPagoService) {
    this.tarjetaForm = this.fb.group({
      nombreTitular: [
        '',
        [Validators.required, Validators.minLength(3), this.validarNombre],
      ],
      numeroTarjeta: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      fechaExpiracion: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{2})$'),
          this.validarFechaExpiracion,
        ],
      ]
    });
  }

  guardarDatos() {
    if (this.tarjetaForm.valid) {
      this.tarjeta = this.tarjetaForm.value;
      this.tarjeta.numeroTarjeta = this.tarjetaForm
        .get('numeroTarjeta')
        ?.value?.replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ');
      this.metodoPagoService.guardarMetodoPago({
        ...this.tarjeta,

      }).subscribe((res)=>{
        if(res)
          {
            let tarjetasGuardadas =
              JSON.parse(localStorage.getItem('tarjetasGuardadas') || '[]') || [];
            const tarjetaExistente = tarjetasGuardadas.find(
              (tarjeta:Tarjeta) => tarjeta.numeroTarjeta === this.tarjeta.numeroTarjeta
            );
            if (tarjetaExistente) {
              this.mensaje =
                'La tarjeta ya existe, por favor ingrese un número diferente.';
              this.mostrarMensaje = true;
              setTimeout(() => (this.mostrarMensaje = false), 3000);
            } else {
              tarjetasGuardadas.push(this.tarjeta);
              localStorage.setItem(
                'tarjetasGuardadas',
                JSON.stringify(tarjetasGuardadas)
              );
              this.mensaje = 'Datos de la tarjeta guardados correctamente!';
              this.mostrarMensaje = true;
              this.tarjetaForm.reset();
              this.tarjeta = {};
              this.tarjetaGuardada.emit();
              setTimeout(() => (this.mostrarMensaje = false), 3000);
              alert('Se ha agregado la tarjeta exitosamente')

            }


          }
      }

    )}
    else {
      this.mensaje = 'Por favor, complete todos los campos correctamente.';
      this.mostrarMensaje = true;
      setTimeout(() => (this.mostrarMensaje = false), 3000);
    }
  }




  validarNombre(control: AbstractControl): ValidationErrors | null {
    const nombre = control.value;
    const nombreValido = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/.test(nombre);

    return nombre && !nombreValido ? { nombreInvalido: true } : null;
  }

  validarFechaExpiracion(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const [month, year] = value.split('/');

    // Validar que el mes esté en el rango [1, 12]
    if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      return { mesInvalido: true };
    }

    // Validar que el año sea un número positivo
    if (parseInt(year, 10) < 0) {
      return { añoInvalido: true };
    }

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      parseInt(year, 10) < currentYear ||
      (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)
    ) {
      return { fechaExpirada: true };
    }
    return null;
  }

  get f() {
    return this.tarjetaForm.controls;
  }
}
