import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RayoPlusSolicitudComponent } from './rayo-plus-solicitud.component';

describe('RayoPlusSolicitudComponent', () => {
  let component: RayoPlusSolicitudComponent;
  let fixture: ComponentFixture<RayoPlusSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RayoPlusSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RayoPlusSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
