import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionComponent } from './actualizacion.component';

describe('ActualizacionComponent', () => {
  let component: ActualizacionComponent;
  let fixture: ComponentFixture<ActualizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizacionComponent]
    });
    fixture = TestBed.createComponent(ActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
