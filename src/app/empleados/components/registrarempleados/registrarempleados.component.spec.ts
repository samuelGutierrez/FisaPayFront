import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarempleadosComponent } from './registrarempleados.component';

describe('RegistrarempleadosComponent', () => {
  let component: RegistrarempleadosComponent;
  let fixture: ComponentFixture<RegistrarempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarempleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
