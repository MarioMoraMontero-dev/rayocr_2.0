import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoActivoComponent } from './prestamo-activo.component';

describe('PrestamoActivoComponent', () => {
  let component: PrestamoActivoComponent;
  let fixture: ComponentFixture<PrestamoActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
