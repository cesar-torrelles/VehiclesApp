import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { VehicleView } from 'src/app/domain/vehicleView';

@Component({
  selector: 'app-clone-vehicle-form',
  templateUrl: './clone-vehicle-form.component.html',
  styleUrls: ['./clone-vehicle-form.component.css']
})
export class CloneVehicleFormComponent implements OnChanges {

  msgs: Message[] = [];
  @Input() vehicleData: VehicleView;
  @Output() clonedVehicle = new EventEmitter<VehicleView>();
  @Output() cancel = new EventEmitter<void>();
  cloneVehicleForm: any;

  onCancel() {
      this.cancel.emit(); // emite evento hacia el padre
  }

  vehicleCloneForm!: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
      this.vehicleCloneForm = this.fb.group({
        plate: ['', Validators.required], 
        
      });
    }
  //Is automatically executed each time one of the input property values (@Input()) changes.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehicleData'] && changes['vehicleData'].currentValue && this.vehicleCloneForm) {
      const { plate } = this.vehicleData; //We only need the plate
      this.cloneVehicleForm.patchValue({plate: this.vehicleData.plate || ''});
      //this.displayDialog = false;
    }
  }

  onSubmit() {
    if (this.cloneVehicleForm.valid) {
      //We create a new object to clone the car. Only change the plate.
      const clonedVehicle = {
        ...this.vehicleData, //Clone the entire original object
        plate: this.cloneVehicleForm.value.plate, //Update the registration
      };

      this.clonedVehicle.emit(clonedVehicle); //We send the cloned vehicle to the parent component
    }
   // this.displayDialog = false;
  }
  

}
