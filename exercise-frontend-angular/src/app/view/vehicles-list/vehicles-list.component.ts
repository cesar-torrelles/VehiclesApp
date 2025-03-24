import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../services/vehicles/vehicles.service';
import {VehicleView} from '../../domain/vehicleView';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  vehicleList: VehicleView[];
  vehicle: VehicleView;

  constructor(private vehiclesService: VehiclesService) {

  }

  ngOnInit() {
    this.loadVehicles();
  }

  private loadVehicles() {
    this.vehiclesService.loadVehicles().subscribe(response => this.onVehicleListCallSuccess(response));
  }

  private onVehicleListCallSuccess(response) {
    this.vehicleList = response.map(vehicle => {
      return new VehicleView(vehicle.id, vehicle.plate, vehicle.manufacturer, vehicle.make, vehicle.commercialName,
        vehicle.vinNumber, vehicle.capacity);
    });
  }

  public prepareToCreateVehicle() {
    this.vehicle = new VehicleView();
  }

}
