package com.vehicles.exercise.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

//Objeto en BBDD
@Entity
@Table(name="Vehicle")

//Serializable permite convertir objetos en una secuencia de bytes.
public class Vehicle implements Serializable{

	//serialVersionUID evita problemas de compatibilidad entre versiones de una clase.
	private static final long serialVersionUID = -6196872657879605001L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	//Se puede referenciar una entidad por su @NaturalId en lugar de su @Id, evitando dependencias directas con claves primarias.
	@NaturalId
	
	//plate no se puede modificar, es unico
    @Column(nullable = false, unique = true)
	private String plate;
	
	@Column(nullable = false)
	private String manufacturer;
	
	@Column(nullable = false)
	private String make;
	
	@Column(nullable = false)
	private String commercialName;
	
	@Column(nullable = false)
	private String vinNumber;
	
	@Column(nullable = true)
	private Integer capacity;
	
	
	
	//getters y setters
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
