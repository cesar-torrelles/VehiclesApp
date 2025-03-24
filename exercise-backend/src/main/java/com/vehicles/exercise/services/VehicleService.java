package com.vehicles.exercise.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vehicles.exercise.domain.Vehicle;


//

@Service
//interface define metodos pero no los implementa, no hay logica. De momento no se va a usar
public interface VehicleService {
	
	//Retorna una lista de todos los vehículos.
	List<Vehicle> listAllVehicles();
	
	
	//Guarda un solo vehículo en la base de datos.
	Vehicle createVehicle(Vehicle vehicle);
	
	//Elimina un solo vehiculo en la base de datos.
	void deleteVehicle(int id);
	
	//Edita un solo vehiculo en la base de datos.
	Vehicle editVehicle(int id, Vehicle editedVehicle);
	
	
	//Guarda una lista de vehículos en la base de datos.
	void createVehicles(List<Vehicle> vehicles);

	//Clona un solo vehiculo seleccionado a partir del plate.
	Vehicle cloneVehicle(int id, String NewPlate);


	List<Vehicle> sortByPlateAllVehicles();

	
	

}
