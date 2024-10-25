package com.test.Crud.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.test.Crud.Entitys.Employee_Entity;


@Repository
public interface Employee_Repository extends JpaRepository<Employee_Entity, Long> {
	
//	Optional<Employee_Entity> findById(Long id);

}
