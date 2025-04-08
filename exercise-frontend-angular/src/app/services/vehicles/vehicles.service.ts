import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {VehicleView} from '../../domain/vehicleView';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url: string;
  headers: {'Content-Type': 'application/json'};

  constructor(public http: HttpClient, private injector: Injector) {
    this.url = environment.domainUrl + 'vehicles';
  }

  //method to load vehicles
  loadVehicles(): Observable<VehicleView[]> {
    return this.http.get<VehicleView[]>(this.url, {headers: this.headers});
  }

  //method to create a vehicle
  createVehicle(vehicleView: VehicleView): Observable<VehicleView> {
    return this.http.post<VehicleView>(this.url, vehicleView, {headers: this.headers});
  }

  //method to update a vehicle
  updateVehicle(vehicleView: VehicleView){
    return this.http.put(`${this.url}/${vehicleView.id}`, vehicleView);
  }

  //Method to get one vehicle searching by id
  getVehicleById(id: number): Observable<VehicleView> {
    return this.http.get<VehicleView>(`${this.url}/${id}`);
  } 

  //method to delete a vehicle
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, {
      responseType: 'text' as 'json'
    });

  }
}
