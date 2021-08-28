import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteExisteComponent } from './cliente-existe.component';

describe('ClienteExisteComponent', () => {
  let component: ClienteExisteComponent;
  let fixture: ComponentFixture<ClienteExisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteExisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteExisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
