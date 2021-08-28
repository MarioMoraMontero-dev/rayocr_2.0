import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaRayoPlusComponent } from './vista-rayo-plus.component';

describe('VistaRayoPlusComponent', () => {
  let component: VistaRayoPlusComponent;
  let fixture: ComponentFixture<VistaRayoPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaRayoPlusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaRayoPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
