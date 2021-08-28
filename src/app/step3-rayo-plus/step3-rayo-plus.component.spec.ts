import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3RayoPlusComponent } from './step3-rayo-plus.component';

describe('Step3RayoPlusComponent', () => {
  let component: Step3RayoPlusComponent;
  let fixture: ComponentFixture<Step3RayoPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3RayoPlusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3RayoPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
