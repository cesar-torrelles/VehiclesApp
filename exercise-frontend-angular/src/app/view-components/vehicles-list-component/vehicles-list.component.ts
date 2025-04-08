import { Component, OnInit } from '@angular/core';
import {VehiclesService} from '../../services/vehicles/vehicles.service';
import {VehicleView} from '../../domain/vehicleView';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent implements OnInit {

  vehicleList: VehicleView[];
  vehicle: VehicleView;
  selectedVehicle: any;
  msgs: Message[] = [];

  constructor(private vehiclesService: VehiclesService) {

  }

  ngOnInit() {
    this.loadVehicles();
  }

  private loadVehicles() {
    this.vehiclesService.loadVehicles().subscribe(response => this.onVehicleListCallSuccess(response));
  }

  private deleteVehicle(id: number){
    this.vehiclesService.deleteVehicle(id).subscribe(
      
      (response) => {
        
        this.msgs = [{ severity: 'success', summary: 'Vehicle removed', detail: `Vehicle ${id} successfully eliminated` }];
        this.loadVehicles();
      },
      (error) => {
        //If there has been an error, we will display an error message.
        this.msgs = [{ severity: 'error', summary: 'Error', detail: 'The vehicle could not be deleted. Please try again.' }];
      })
    
    
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
