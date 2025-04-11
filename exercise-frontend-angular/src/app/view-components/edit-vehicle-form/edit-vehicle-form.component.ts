import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { VehicleView } from 'src/app/domain/vehicleView';

@Component({
  selector: 'app-edit-vehicle-form',
  templateUrl: './edit-vehicle-form.component.html',
  styleUrls: ['./edit-vehicle-form.component.css']
})
export class EditVehicleFormComponent implements OnChanges {

 
  msgs: Message[] = [];

  @Input() vehicleData: VehicleView;

  @Output() vehicleUpdated = new EventEmitter<VehicleView>();
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit(); // emite evento hacia el padre
  }
  vehicleEditForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.vehicleEditForm = this.fb.group({
      plate: [{ value: '', disabled: true }], //Disable the plate field. It cannot be edited.
      manufacturer: [''],
      make: [''],
      commercialName: [''],
      vinNumber: [''],
      capacity: [null]
    });
  }

  
  
    

    //Is automatically executed each time one of the input property values (@Input()) changes.
    ngOnChanges(changes: SimpleChanges) {

      
      //Before attempting to do anything with vehicleData, make sure that its value is neither null nor undefined and that it has not changed.
      if (changes['vehicleData'] && changes['vehicleData'].currentValue) {
        //Updates the form fields with the values from vehicleData
        this.vehicleEditForm.patchValue({
          plate: this.vehicleData.plate || '',
          manufacturer: this.vehicleData.manufacturer || '',
          make: this.vehicleData.make || '',
          commercialName: this.vehicleData.commercialName || '',
          vinNumber: this.vehicleData.vinNumber || '',
          capacity: this.vehicleData.capacity || '',

          
        });
      }
    }

    

    onSubmit() {
      if (this.vehicleEditForm.valid) {
        //Contains a combination of unmodified data from this.vehicleData and modified values from the form.
        const updatedVehicle = {
          ...this.vehicleData,
          ...this.vehicleEditForm.value
        };
        this.vehicleUpdated.emit(updatedVehicle); //Send the data to vehicle-list component
      }
    }
}
