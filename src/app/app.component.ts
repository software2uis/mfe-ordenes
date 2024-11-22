import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Marca este componente como standalone
  imports: [RouterModule],  // Importa el componente de direcciones
})
export class AppComponent {
  title = 'direcciones-app';  // Lógica adicional si la tienes
}
