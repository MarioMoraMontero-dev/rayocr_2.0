import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3PrimerizosComponent } from './step3-primerizos.component';

describe('Step3PrimerizosComponent', () => {
  let component: Step3PrimerizosComponent;
  let fixture: ComponentFixture<Step3PrimerizosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Step3PrimerizosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Step3PrimerizosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
