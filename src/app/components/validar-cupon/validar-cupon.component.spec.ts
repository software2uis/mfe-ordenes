import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCuponComponent } from './validar-cupon.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../../../../services/cupon/cupon.service';

describe('ValidarCuponComponent', () => {
  let component: ValidarCuponComponent;
  let fixture: ComponentFixture<ValidarCuponComponent>;
  let cuponService: CuponService;

  beforeEach(async () => {
    const cuponServiceMock = {
      obtenerCupones: jasmine.createSpy('obtenerCupones').and.returnValue(of([
        { codigo: 'cupon1', fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2024-12-31'), descuento: 0.1, categorias: [] },
        { codigo: 'cupon2', fechaInicio: new Date('2024-11-30'), fechaFin: new Date('2025-01-31'), descuento: 0.2, categorias: [] },
        { codigo: 'CUPON3', fechaInicio: new Date('2024-01-01'), fechaFin: new Date('2024-12-31'), descuento: 0.3, categorias: [] },
        { codigo: 'cUpOn4', fechaInicio: new Date('2024-11-01'), fechaFin: new Date('2025-01-31'), descuento: 0.4, categorias: [] }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule,ValidarCuponComponent],
      declarations: [],
      providers: [
        { provide: CuponService, useValue: cuponServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarCuponComponent);
    component = fixture.componentInstance;
    cuponService = TestBed.inject(CuponService);
    component.validacion = jasmine.createSpyObj('validacion', ['emit']);
    fixture.detectChanges(); 
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los cupones en ngOnInit', () => {
    expect(cuponService.obtenerCupones).toHaveBeenCalled();
    expect(component.cupones.length).toBe(4); 
  });

  it('debe validar un cupón válido', () => {
    component.codigoCupon = 'cupon1';
    component.validarCupon();

    expect(component.mensaje).toBe('Cupón validado con éxito.');
    expect(component.validacion.emit).toHaveBeenCalledWith({ valido: true, descuento: 0.1 });
  });

  it('debe mostrar mensaje de error si el cupón es inválido', () => {
    component.codigoCupon = 'cupon-invalido'; 
    component.validarCupon();

    expect(component.mensaje).toBe('Cupón inválido');
  });

  it('debe mostrar mensaje de error si el código de cupón está vacío', () => {
    component.codigoCupon = ''; 
    component.validarCupon();

    expect(component.mensaje).toBe('Por favor, ingrese un código de cupón.');
  });

  it('debe mostrar mensaje si el cupón no está vigente', () => {
    component.codigoCupon = 'cupon2';
    component.validarCupon();

    expect(component.mensaje).toBe('El cupón no se encuentra vigente.');
  });
});