package com.vehicles.exercise.dto;

import java.io.Serializable;

//SE USA PARA CREAR LOS VEHICULOS POR DEFECTO EN H2
/*DTO (Data Transfer Object) es un objeto de transferencia de datos que se usa para enviar datos 
entre diferentes capas de una aplicación 
sin exponer directamente las entidades del modelo de base de datos.*/


//este DTO no contiene el ID del vehiculo
public class CreateVehicleDTO implements Serializable{

	private static final long serialVersionUID = -6196872657879605001L;

	private String plate;
	private String manufacturer;
	private String make;
	private String commercialName;
	private String vinNumber;
	private Integer capacity;
	

	public String getPlate() {
		return plate;
	}
	public void setPlate(String plate) {
		this.plate = plate;
	}
	public String getManufacturer() {
		return manufacturer;
	}
	public void setManufacturer(String maunfacturer) {
		this.manufacturer = maunfacturer;
	}
	public String getMake() {
		return make;
	}
	public void setMake(String make) {
		this.make = make;
	}
	public String getCommercialName() {
		return commercialName;
	}
	public void setCommercialName(String commercialName) {
		this.commercialName = commercialName;
	}
	public String getVinNumber() {
		return vinNumber;
	}
	public void setVinNumber(String vinNumber) {
		this.vinNumber = vinNumber;
	}
	public Integer getCapacity() {
		return capacity;
	}
	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}
	
	

}
