package com.vehicles.exercise.web.controller;

import java.util.List;


import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vehicles.exercise.domain.Vehicle;
import com.vehicles.exercise.dto.CreateVehicleDTO;
import com.vehicles.exercise.dto.VehicleDTO;
import com.vehicles.exercise.services.VehicleService;
import com.vehicles.exercise.web.converter.VehicleConverter;



/*Esta anotación configura CORS (Cross-Origin Resource Sharing), permitiendo que la API acepte solicitudes desde diferentes dominios.

origins = "*" → Permite el acceso desde cualquier dominio.
allowCredentials = "true" → Habilita el uso de cookies o autenticación en las peticiones.
methods = {GET, POST, PUT, DELETE, OPTIONS} → Especifica qué métodos HTTP están permitidos.*/



@CrossOrigin(
		origins = "*", 
		allowCredentials = "true", 
		methods = {RequestMethod.GET, 
		           RequestMethod.POST, 
		           RequestMethod.PUT, 
		           RequestMethod.DELETE,
		           RequestMethod.OPTIONS}
)
@RestController
@RequestMapping("/vehicles")
public class VehicleController {
	
	@Autowired
	private VehicleService vehicleService;
	@Autowired
	private VehicleConverter vehicleConverter;
	
	
	
	
	/*@GetMapping: Indica que este método manejará solicitudes HTTP GET en la ruta en la que se encuentre definido (puede estar en un controlador @RestController).
@ResponseBody: Asegura que el retorno del método será enviado como el cuerpo de la respuesta HTTP en formato JSON o XML (según la configuración de Spring).*/
	@GetMapping
    @ResponseBody
    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> vehicles = vehicleService.listAllVehicles();
        return vehicles.stream().map(vehicleConverter::convertToDto).collect(Collectors.toList());
        
        
       /*vehicles.stream(): Convierte la lista de Vehicle en un flujo de datos.
		.map(vehicleConverter::convertToDto): Aplica la función convertToDto de vehicleConverter a cada elemento, convirtiendo Vehicle en VehicleDTO.
		.collect(Collectors.toList()): Convierte el flujo de datos nuevamente en una lista.*/
        
    }
	
	@GetMapping("/sortbyplate")
    @ResponseBody
	public List<VehicleDTO> sortByPlateAllVehicles(){
		List<Vehicle> vehicles = vehicleService.sortByPlateAllVehicles();
		return vehicles.stream().map(vehicleConverter::convertToDto).collect(Collectors.toList());
		}
	
	@PostMapping
	@ResponseBody
	public VehicleDTO createVehicle(@RequestBody CreateVehicleDTO dto){
		Vehicle vehicle = vehicleService.createVehicle(vehicleConverter.convertToEntity(dto));
		return vehicleConverter.convertToDto(vehicle);
	}
	
	@PostMapping("/{id}/clone")
	@ResponseBody
	public VehicleDTO cloneVehicle(@PathVariable int id, @RequestParam String NewPlate) {
		Vehicle clonedVehicle = vehicleService.cloneVehicle(id, NewPlate);
		return vehicleConverter.convertToDto(clonedVehicle);
	}
	
	@DeleteMapping("/{id}")
	@ResponseBody
	public ResponseEntity<String> deleteVehicle(@PathVariable int id){
		vehicleService.deleteVehicle(id);
		return ResponseEntity.ok("Vehicle Deleted Succesfully");		
	}
	
	@PutMapping("/{id}")
	@ResponseBody
	public VehicleDTO editVehicle(@PathVariable int id, @RequestBody VehicleDTO dto ) {
		Vehicle vehicle = vehicleService.editVehicle(id, vehicleConverter.convertToEntity(dto));
		return vehicleConverter.convertToDto(vehicle);
	}
	


}
