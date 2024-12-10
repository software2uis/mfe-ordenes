import { Routes } from '@angular/router';
//Componentes
import { ValidarCuponComponent } from './components/validar-cupon/validar-cupon.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ResumenPedidoComponent } from './components/resumen-pedido/resumen-pedido.component';



export const routes: Routes = [
    {path:"direcciones", component:  DireccionesComponent},
    {path:"cupon", component:  ValidarCuponComponent},
    {path:"tarjeta", component:  TarjetaComponent},
    {path:"resumen", component:  ResumenPedidoComponent},
    {
      path: 'ordenes',
      loadComponent: () => import('./components/listar-ordenes/listar-ordenes.component').then(m => m.ListarOrdenesComponent)
    }
];
