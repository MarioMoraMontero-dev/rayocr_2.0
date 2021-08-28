import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCumpleRequisitosComponent } from './no-cumple-requisitos.component';

describe('NoCumpleRequisitosComponent', () => {
  let component: NoCumpleRequisitosComponent;
  let fixture: ComponentFixture<NoCumpleRequisitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoCumpleRequisitosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCumpleRequisitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
