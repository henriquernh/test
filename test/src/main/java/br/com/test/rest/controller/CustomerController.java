package br.com.test.rest.controller;

import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.test.model.Customer;
import br.com.test.repository.CustomerRepositoryJpa;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	private CustomerRepositoryJpa customerRepositoryJpa;
	
	@GetMapping(value = "/listCustomer", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> list () {
			
		List<Customer> lista = customerRepositoryJpa.findAll();
		lista.sort(Comparator.comparing(Customer::getCustomerName));
		
		return !lista.isEmpty() ? new ResponseEntity<>(lista , HttpStatus.OK) : 
	                              new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
			
	}
	
}
