import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-vehicle-form',
  templateUrl: './add-vehicle-form.component.html',
  styleUrls: ['./add-vehicle-form.component.css']
})
export class AddVehicleFormComponent {

  displayModal: boolean = false;
  msgs: Message[] = [];

  constructor(private messageService: MessageService) { }
  
  newVehicle ={plate:'',manufacturer:'',make:'',commercialName:'',vinNumber:'',capacity:null};

  
  @Output() vehicleAdded = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit(); // emite evento hacia el padre
  }

  onSubmit() {
    if (!this.newVehicle.plate || !this.newVehicle.manufacturer || !this.newVehicle.make || !this.newVehicle.commercialName || !this.newVehicle.vinNumber || !this.newVehicle.capacity) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields are required.' });
      return; //If there are empty fields, don't send the vehicle.
    }
    //Submit new vehicle to vehicle-list component
    this.vehicleAdded.emit(this.newVehicle);

    //Reset 'newVehicle' after submission
    this.newVehicle = { plate: '', manufacturer: '', make: '', commercialName: '', vinNumber: '', capacity: null };

  }

  

}
