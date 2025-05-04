import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayouthComponent } from './layouth.component';

describe('LayouthComponent', () => {
  let component: LayouthComponent;
  let fixture: ComponentFixture<LayouthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayouthComponent]
    });
    fixture = TestBed.createComponent(LayouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
