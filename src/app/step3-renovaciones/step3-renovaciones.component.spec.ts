import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3RenovacionesComponent } from './step3-renovaciones.component';

describe('Step3RenovacionesComponent', () => {
  let component: Step3RenovacionesComponent;
  let fixture: ComponentFixture<Step3RenovacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3RenovacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3RenovacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
