import { Component } from '@angular/core';
import { DireccionesComponent } from './components/direcciones/direcciones.component'; // Importa tu componente

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Marca este componente como standalone
  imports: [DireccionesComponent],  // Importa el componente de direcciones
})
export class AppComponent {
  title = 'direcciones-app';  // Lógica adicional si la tienes
}
