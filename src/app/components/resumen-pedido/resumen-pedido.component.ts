import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { ValidarCuponComponent } from '../validar-cupon/validar-cupon.component';
import { CommonModule } from '@angular/common';
import { Tarjeta } from '../../../../models/tarjeta.model';
import { PedidoService } from '../../../../services/pedido/pedido.service';
import { Pedido } from '../../../../models/pedido';
import { Producto } from '../../../../models/producto.model';
import { MetodoPagoService } from '../../../../services/metodo-pago/metodo-pago.service';
import { OrdenDTO } from '../../../../models/orden.model';
import { OrdenService } from '../../services/orden.service';
import { map, switchMap, tap } from 'rxjs';
import { Client } from '../../../../models/client.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TarjetaComponent,
    ValidarCuponComponent,
    CommonModule,
  ],
})
export class ResumenPedidoComponent implements OnInit {
  productos: Producto[] = [];
  total: number = 0;
  monto: number = 0;
  estado: boolean = false;
  descuentos: number = 0;
  metodoPagoSeleccionado: string = '';
  mostrarFormularioTarjeta: boolean = false;
  tarjetasGuardadas: Tarjeta[] = [];
  metodoPagoForm: FormGroup;
  validCupon: boolean = false;
  mostrarTarjetas: boolean = true;
  mostrarMensaje:boolean = false;
  mensaje:string ='';
  user: string | null = null;
  idCliente: number | null= null;
  router = inject(Router);

  constructor(private fb: FormBuilder, private _pedidoServ: PedidoService, private metodoPagoService:MetodoPagoService, private ordenService:OrdenService) {

    this.calcularTotal();
    this.metodoPagoForm = this.fb.group({
      metodoPago: ['', Validators.required],
    });

    this.cargarTarjetasGuardadas();

    this.metodoPagoForm.get('metodoPago')?.valueChanges.subscribe((value) => {
      this.metodoPagoSeleccionado = value;
      this.cerrarDropdown();
    });
  }

  ngOnInit(): void {


    this.user = localStorage.getItem('username');
    if(this.user){
      this.ordenService.getClientByEmail(this.user).
      pipe(
        map((client: Client) => this.idCliente=  client.id as number),

      ).subscribe(
        ()=>{
          if(this.user){
              this._pedidoServ.obtenerProductos(this.user).subscribe(
                (response: Producto[]) => {
                  if (response && response.length > 0) {
                    response.forEach((producto) => {
                      if (producto.quantity > 0) {
                        this.productos.push(producto)
                        this.monto += producto.price * producto.quantity;
                        this.total = this.monto;
                      }
                    });
                  } else {
                    console.log('No se encontraron productos');
                  }
                },
                (error) => {
                  console.error('Error fetching data', error);
                }
              );

            }

          }

      );
    }else{
      this.router.navigateByUrl('/login');
    }


    // const tarjetasMock: Tarjeta[] = [
    //   {
    //     nombreTitular: 'María López',
    //     numeroTarjeta: '9876 5432 1098 7654',
    //     fechaExpiracion: '11/29',
    //   },
    //   {
    //     nombreTitular: 'Carlos García',
    //     numeroTarjeta: '4567 8901 2345 6789',
    //     fechaExpiracion: '10/26',
    //   },
    //   {
    //     nombreTitular: 'Ana Martínez',
    //     numeroTarjeta: '3210 9876 5432 1098',
    //     fechaExpiracion: '09/27',
    //   },
    //   {
    //     nombreTitular: 'Luis Fernández',
    //     numeroTarjeta: '6543 2109 8765 4321',
    //     fechaExpiracion: '08/27',
    //   },
    // ];
    // localStorage.setItem('tarjetasGuardadas', JSON.stringify(tarjetasMock));
  }

  enviarPedido() {
    if (!this.productos.length) {
      this.mostrarMensaje = true;
      this.mensaje = 'Debe haber al menos un producto en el pedido.';
      setTimeout(() => (this.mostrarMensaje = false), 3000);
      return;
    }

    if (!this.metodoPagoSeleccionado) {
      this.mostrarMensaje = true;
      this.mensaje = 'El método de pago es requerido.';
      setTimeout(() => (this.mostrarMensaje = false), 3000);
      return;
    }
    const datosPedido: OrdenDTO = {
      items: this.productos.map((producto) => {
        return {
          id: producto.idMongo,
          cantidad: producto.quantity,
          precio: producto.price,
          nombre: producto.name
        };
      }),
      cliente:{
        email: this.user || ''
      },
      ciudadEnvio : 'Bogota',
      direccionEnvio : 'Calle 123',
      costoEnvio : 10,
      descuentoAplicado: 20.0,
      tiempoEstimadoEntrega : "2 dias",
      codigoPostalEnvio : "11001",
    };



    if (datosPedido && this.idCliente) {
      this.estado = true;

      const btnEnviar = document.getElementById('btnEnviar');
      if (btnEnviar) {
        btnEnviar.style.display = 'none';
      }

      const btnTarjeta = document.getElementById('dropdownMenuButton')!;
      if (btnTarjeta) {
        btnTarjeta.style.display = 'none';
      }

      const btnCupon = document.getElementById('dropdownDescuentos')!;
      if (btnCupon) {
        btnCupon.style.display = 'none';
      }

      this._pedidoServ.enviarPedido(datosPedido,this.idCliente)
      .subscribe(
        (res)=>{
          if(res)
            {
              this.mostrarMensaje = true;
              this.mensaje = '¡Pago Exitoso!';
              setTimeout(() => {this.mostrarMensaje = false;
                this.eliminarProductos();


              }, 3000);
            }
        }
      )

    }


    //URL pendiente
    // this._pedidoServ.enviarPedido(datosPedido).subscribe(
    //   (response) => {
    //     console.log('Pedido enviado exitosamente:', response);
    //   },
    //   (error) => {
    //     console.error('Error al enviar el pedido:', error);
    //   }

    // );
  }

  cerrarDropdown() {
    const dropdownElement = document.getElementById('paymentOptions');
    if (dropdownElement) {
      dropdownElement.classList.remove('show'); // Quita la clase 'show' para colapsar
    }
  }

  addTarjeta() {
    this.mostrarFormularioTarjeta = !this.mostrarFormularioTarjeta;
  }

  cargarTarjetasGuardadas() {
    const tarjetas = localStorage.getItem('tarjetasGuardadas');
    if (tarjetas) {
      this.tarjetasGuardadas = JSON.parse(tarjetas);
      this.mostrarFormularioTarjeta = false;
    }
  }

  aplicarDescuento(event: { valido: boolean; descuento: number }) {
    if (event.valido) {
      this.descuentos  = event.descuento * 100;
      this.total = this.monto  * ( 1 - event.descuento );
      setTimeout(() => (this.mostrarValidCupon()), 3000);
    }
  }

  mostrarValidCupon() {
    this.validCupon = !this.validCupon;
  }

  calcularTotal() {
    this.productos.forEach((producto) => {
      console.log('Entrando en el método');
      this.monto += producto.price * producto.quantity;
      this.total = this.monto;
      console.log(this.total);
    });
  }

  eliminarProductos(){
    this.productos.forEach((producto) => {
      this._pedidoServ.eliminarProductos(this.user || '', producto.idMongo).subscribe();
    });
    this.productos = [];
    this.monto = 0;
    this.total = 0;
    this.router.navigateByUrl('');

  }
}
