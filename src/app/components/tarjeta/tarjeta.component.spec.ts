import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetaComponent } from './tarjeta.component';

describe('TargetaComponent', () => {
  let component: TargetaComponent;
  let fixture: ComponentFixture<TargetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
