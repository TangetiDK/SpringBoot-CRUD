package com.test.Crud.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.Crud.Entitys.Employee_Entity;
import com.test.Crud.Repositories.Employee_Repository;

import jakarta.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/test")
public class Employee_Controller {
	@Autowired
	private Employee_Repository emp_repo;
	
	
	@GetMapping("/testCase")
	private ResponseEntity<?> test() {
		Map<String, String> res = new HashMap<> ();
		res.put("Message", "Test Success");
		return ResponseEntity.ok(res);
	}
	
	@PostMapping("/addEmployee")
	private ResponseEntity<?> AddEmployee(@RequestBody Employee_Entity resBody) {
		emp_repo.save(resBody);
		Map<String, String> res = new HashMap<> ();
		res.put("Message", "Employee Saved!!");
		return ResponseEntity.ok(res);
		
	}
	
	@GetMapping("/getEmployee")
	private Optional<Employee_Entity> GetEmployee(@PathParam(value = "id") Long id) {
		return emp_repo.findById(id);
	}
	
	@GetMapping("/getEmployees")
	private List<Employee_Entity> GetEmployees() {
		return emp_repo.findAll();
	}
	
	@DeleteMapping("/deleteEmployee")
	private ResponseEntity<?> deleteEmployee(@PathParam(value = "id") Long id) {
		emp_repo.deleteById(id);
		Map<String, String> res = new HashMap<> ();
		res.put("Message", "Employee Deleted");
		return ResponseEntity.ok(res);
		
	}
	
	@PutMapping("/updateEmployee")
	public ResponseEntity<?> updateEmp(@RequestBody Employee_Entity resBody) {
        Long id = resBody.getId();
        Optional<Employee_Entity> emp = emp_repo.findById(id);
        if (emp.isPresent()) {
            Employee_Entity empEnt = emp.get();
            empEnt.setName(resBody.getName());
            empEnt.setAge(resBody.getAge());
            emp_repo.save(empEnt);

            Map<String, String> res = new HashMap<>();
            res.put("Message", "Employee Updated");
            return ResponseEntity.ok(res);
        } else {
            Map<String, String> res = new HashMap<>();
            res.put("Message", "Employee not found");
            return ResponseEntity.status(404).body(res);
        }
    }

}
