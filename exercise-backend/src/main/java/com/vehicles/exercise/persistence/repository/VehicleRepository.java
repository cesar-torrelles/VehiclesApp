package com.vehicles.exercise.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.google.common.base.Optional;
import com.vehicles.exercise.domain.Vehicle;

@Repository
//cuando se hace un "extends" quiere decir que se llaman todos los metodos por defecto de JpaRepository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{
	// Check for duplicates
		Optional<Vehicle> findByPlate(String plate);
}
