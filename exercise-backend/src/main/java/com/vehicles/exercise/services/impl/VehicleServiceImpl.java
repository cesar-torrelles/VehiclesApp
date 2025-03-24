package com.vehicles.exercise.services.impl;


import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vehicles.exercise.domain.Vehicle;
import com.vehicles.exercise.persistence.repository.VehicleRepository;
import com.vehicles.exercise.services.VehicleService;

/*Marca esta clase como un servicio de Spring, lo que permite que Spring la maneje automáticamente.*/
@Service
public class VehicleServiceImpl implements VehicleService {

	//Inyecta el VehicleRepository, que se encarga de la persistencia en la base de datos
	@Autowired
	private VehicleRepository vehicleRepository;

	//Devuelve todos los vehículos de la base de datos
	public List<Vehicle> listAllVehicles() {
		return vehicleRepository.findAll();
	}
	
	//Guarda un único vehículo
	@Override
	public Vehicle createVehicle(Vehicle vehicle) {
		return vehicleRepository.save(vehicle);
	}
	
	//Clona un unico vehiculo
	@Override
	public Vehicle cloneVehicle(int id, String NewPlate) {
		Vehicle existingVehicle = vehicleRepository.findById(id)
				 .orElseThrow(() -> new EntityNotFoundException("Vehicle not found with id: " + id));
		// Check if the new plate already exists
				if (vehicleRepository.findByPlate(NewPlate).isPresent()) {
				    throw new IllegalArgumentException("A vehicle with this plate already exists: " + NewPlate);
				}
				Vehicle clonedVehicle = new Vehicle(); 
				clonedVehicle.setPlate(NewPlate);
				clonedVehicle.setManufacturer(existingVehicle.getManufacturer());
				clonedVehicle.setMake(existingVehicle.getMake());
				clonedVehicle.setCommercialName(existingVehicle.getCommercialName());
				clonedVehicle.setVinNumber(existingVehicle.getVinNumber());
				clonedVehicle.setCapacity(existingVehicle.getCapacity());
				return vehicleRepository.save(clonedVehicle);
	}
	
	
	
	
	//Ordena todos los Vehiculos por matricula
	public List<Vehicle> sortByPlateAllVehicles() {
		List<Vehicle> vehicleList = vehicleRepository.findAll();
		vehicleList.sort((a, b) -> {
	            String lettersA = a.getPlate().replaceAll("\\d", "");
	            String lettersB = b.getPlate().replaceAll("\\d", "");
	            int letterComparison = lettersA.compareTo(lettersB);
	            if (letterComparison != 0) {
	                return letterComparison;
	            }
	            int numberA = Integer.parseInt(a.getPlate().replaceAll("\\D", ""));
	            int numberB = Integer.parseInt(b.getPlate().replaceAll("\\D", ""));
	            return Integer.compare(numberA, numberB);
	        });
	        return vehicleList;
	    }
	
	//Elimina un vehiculo
	@Override
	public void deleteVehicle(int id) {
		vehicleRepository.deleteById(id);
	}
	
	//Edita un vehiculo
	@Override
	public Vehicle editVehicle(int id, Vehicle editedVehicle) {
		return vehicleRepository.findById(id).map(existingVehicle -> {
			existingVehicle.setManufacturer(editedVehicle.getManufacturer());
			existingVehicle.setMake(editedVehicle.getMake());
			existingVehicle.setCommercialName(editedVehicle.getCommercialName());
			existingVehicle.setVinNumber(editedVehicle.getVinNumber());
			existingVehicle.setCapacity(editedVehicle.getCapacity());
			return vehicleRepository.save(existingVehicle);
		}).orElseThrow(()-> new EntityNotFoundException("Vehicle not found with id: "+id));
	}
	
	//Guarda una lista de vehículos.
	public void createVehicles(List<Vehicle> vehicles) {
		vehicleRepository.saveAll(vehicles);
	}


}
