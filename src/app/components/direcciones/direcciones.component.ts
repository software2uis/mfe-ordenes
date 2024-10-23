import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Importa los formularios reactivos

@Component({
  selector: 'app-direcciones',
  standalone: true,
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css'],
  imports: [ReactiveFormsModule]  // Agrega ReactiveFormsModule a los imports
})
export class DireccionesComponent {
  direccionForm: FormGroup;
  direcciones: any[] = [];  // Para almacenar las direcciones agregadas

  constructor(private fb: FormBuilder) {
    this.direccionForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.direccionForm.valid) {
      this.direcciones.push(this.direccionForm.value);
      this.direccionForm.reset();
    }
  }

  editarDireccion(direccion: any) {
    this.direccionForm.setValue({
      nombre: direccion.nombre,
      direccion: direccion.direccion,
      ciudad: direccion.ciudad
    });
  }

  eliminarDireccion(direccion: any) {
    const index = this.direcciones.indexOf(direccion);
    if (index > -1) {
      this.direcciones.splice(index, 1);
    }
  }
}