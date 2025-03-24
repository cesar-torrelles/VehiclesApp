package com.vehicles.exercise.dto;

import java.io.Serializable;


//Aquí definimos el DTO para controlar los datos que entran y salen de la API

//este DTO contiene el ID del vehiculo
public class VehicleDTO implements Serializable{

	private static final long serialVersionUID = -6196872657879605001L;

	private Integer id;
	private String plate;
	private String manufacturer;
	private String make;
	private String commercialName;
	private String vinNumber;
	private Integer capacity;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
