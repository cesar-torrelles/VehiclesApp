import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleFormComponent } from './edit-vehicle-form.component';

describe('EditVehicleFormComponent', () => {
  let component: EditVehicleFormComponent;
  let fixture: ComponentFixture<EditVehicleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVehicleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
