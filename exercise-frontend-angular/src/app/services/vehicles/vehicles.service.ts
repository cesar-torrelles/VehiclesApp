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

  loadVehicles(): Observable<VehicleView[]> {
    return this.http.get<VehicleView[]>(this.url, {headers: this.headers});
  }

  createVehicle(vehicleView: VehicleView): Observable<VehicleView> {
    return this.http.post<VehicleView>(this.url, vehicleView, {headers: this.headers});
  }




}
