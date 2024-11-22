import { Routes } from '@angular/router';
//Componentes
import { ValidarCuponComponent } from './components/validar-cupon/validar-cupon.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component'; // Importa tu componente


export const routes: Routes = [
    {path:"direcciones", component:  DireccionesComponent},
    {path:"cupon", component:  ValidarCuponComponent}
];
