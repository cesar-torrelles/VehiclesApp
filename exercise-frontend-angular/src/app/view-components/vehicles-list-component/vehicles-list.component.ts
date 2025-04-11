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

  // Control the visibility of the modals
  displayNewVehicleDialog: boolean = false;
  displayEditDialog: boolean = false;
  displayCloneDialog: boolean = false;

  vehicleList: VehicleView[];
  vehicle: VehicleView;
  selectedVehicle: any;

  msgs: Message[] = [];

  constructor(private vehiclesService: VehiclesService) {

  }

  ngOnInit() {
    this.loadVehicles();
  }

  //Function to display the dialog
  showNewVehicleDialog() {
    this.displayNewVehicleDialog = true;
    
  }

  closeNewVehicleDialog() {
    this.displayNewVehicleDialog = false;
  }

  showEditDialog() {
    this.displayEditDialog = true;
  }
  
  closeEditDialog() {
    this.displayEditDialog = false;
  } 

  showCloneDialog() {
    this.displayCloneDialog = true;
  }
  
  closeCloneDialog() {
    this.displayCloneDialog = false;
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

  //Method to open dialog and create vehicle
  onVehicleAdded(newVehicle: VehicleView) {
    //Close the popup
    this.showNewVehicleDialog()

    if (!newVehicle) {
      this.msgs = [{ severity: 'error', summary: 'Error', detail: 'The vehicle could not be added. Please check the data.' }];
      return;
    }
    //creates the new vehicle 
    this.vehiclesService.createVehicle(newVehicle).subscribe(
      (response) => {
        if (response && response.id) {  //Suppose the API returns an ID if this was created correctly.
          this.vehicleList.push(response);
          this.ngOnInit();
          this.msgs = [{ severity: 'success', summary: 'Success', detail: 'Vehicle successfully added.' }];
          this.closeNewVehicleDialog();
        } else {
          this.msgs = [{ severity: 'error', summary: 'Error', detail: 'Vehicle could not be added.' }];
        }
      },
      (error) => {
        this.msgs = [{ severity: 'error', summary: 'Error', detail: 'A problem has occurred while storing the car.' }];
      }
      

    );
  }

  //Method to open the edit dialog
  onEditVehicle(vehicle: VehicleView) {
    this.selectedVehicle = { ...vehicle }; // Fuerza cambio de referencia
    this.showEditDialog();
    //console.log("Padre: "+this.selectedVehicle.id+" "+this.selectedVehicle.plate );  
  }
  

  //Vehicle list update method after editing
  onVehicleUpdated(updatedVehicle: VehicleView) {
    this.vehiclesService.updateVehicle(updatedVehicle).subscribe(
      (response) => {
        this.msgs = [{ severity: 'success', summary: 'Edited vehicle', detail: `Vehicle ${updatedVehicle.plate} successfully updated` }];
        this.ngOnInit();
        this.closeEditDialog();
      },
      (error) => {
        //If there has been an error, we will display an error message.
        this.msgs = [{ severity: 'error', summary: 'Error', detail: 'The vehicle could not be updated. Please try again.' }];
      })
  }

  //Method to open clone dialog
  onCloneVehicle(clonedVehicle: VehicleView) {
    this.selectedVehicle = { ...clonedVehicle };
    this.displayCloneDialog = true;
  }
  

}
