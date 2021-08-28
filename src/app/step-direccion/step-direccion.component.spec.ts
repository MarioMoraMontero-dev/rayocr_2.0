import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDireccionComponent } from './step-direccion.component';

describe('StepDireccionComponent', () => {
  let component: StepDireccionComponent;
  let fixture: ComponentFixture<StepDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDireccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
