import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVistaComponent } from './cliente-vista.component';

describe('ClienteVistaComponent', () => {
  let component: ClienteVistaComponent;
  let fixture: ComponentFixture<ClienteVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteVistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
