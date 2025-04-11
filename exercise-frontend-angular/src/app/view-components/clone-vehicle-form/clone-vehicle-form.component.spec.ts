import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneVehicleFormComponent } from './clone-vehicle-form.component';

describe('CloneVehicleFormComponent', () => {
  let component: CloneVehicleFormComponent;
  let fixture: ComponentFixture<CloneVehicleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneVehicleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
