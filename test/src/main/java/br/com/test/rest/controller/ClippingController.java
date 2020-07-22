package br.com.test.rest.controller;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.test.model.Clipping;
import br.com.test.repository.ClippingRepositoryJpa;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/clipping")
public class ClippingController {
	
	@Autowired
	private ClippingRepositoryJpa clippingRepositoryJpa;
	
	@PostMapping(value = "/saveClipping", consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> save (@RequestBody  Clipping clipping) {
		
		if(clipping.getClassifiedDate() != null &&
		   clipping.getClassificationType().equalsIgnoreCase("HEARING")) {
			
			clipping.setAppointmentCreatedAt(clipping.getClassifiedDate());
			
		}else if (clipping.getClassificationType().equalsIgnoreCase("HEARING")){
			clipping.setAppointmentCreatedAt(getThirdDayOfTheWeek());			
		}
		
		if(clipping.getImportant() == true) {
			clipping.setNotificationViewed(false);
		}
		
		clipping.setViewed(false);
		
		
		Clipping getClipping =	clippingRepositoryJpa.save(clipping);
		
		return new ResponseEntity<>(getClipping ,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/deleteClippingById/{idCustomer}")
	ResponseEntity<?> deleteClipping(@PathVariable Long idCustomer){
		
		clippingRepositoryJpa.deleteById(idCustomer);
		
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("/deleteAllClippingByCustomer/{idCustomer}")
	ResponseEntity<?> deleteAllClipping(@PathVariable Long idCustomer){
		
		Iterable<Clipping> listClippingByCustomer = clippingRepositoryJpa.findAllClippingByCustomer(idCustomer, null);
		clippingRepositoryJpa.deleteAll(listClippingByCustomer);
		
		return ResponseEntity.ok().build();
	}
	
	@GetMapping(value = "/listClipping/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> listClipping (@PathVariable int page) {
		
		
		Page<Clipping> clipping = clippingRepositoryJpa.findAll(PageRequest.of(page, 4));
	
		
		return !clipping.isEmpty() ? new ResponseEntity<>(clipping , HttpStatus.OK) : 
									 new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
			
	}
	
	@GetMapping(value = "/getClippingById/{idClipping}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> clippingById (@PathVariable Long idClipping) {
		
		Optional<Clipping> getClipping = clippingRepositoryJpa.findById(idClipping);
		
		return getClipping.isPresent() ? new ResponseEntity<>(getClipping.get() , HttpStatus.OK) : 
									     new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
			
	}
	
	@GetMapping(value = "/listClippingByCustomer/{idCustomer}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> listClippingCustomer (@PathVariable Long idCustomer, @PathVariable int page) {
		
		Page<Clipping> listClippingByCustomer = clippingRepositoryJpa.findAllClippingByCustomer(idCustomer, PageRequest.of(page, 4, Sort.by("clipping_date")));
		
		return !listClippingByCustomer.isEmpty() ? new ResponseEntity<>(listClippingByCustomer , HttpStatus.OK) : 
												   new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
			
	}

	@GetMapping(value = "/listClippingWithAlert/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> listClippingWithAlert (@PathVariable int page) {
		
		Page<Clipping> listClippingByCustomer = clippingRepositoryJpa.findAllClippingWhitNotification(PageRequest.of(page, 4, Sort.by("notification_created_at").descending()));
		
		return !listClippingByCustomer.isEmpty() ? new ResponseEntity<>(listClippingByCustomer , HttpStatus.OK) : 
												   new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
			
	}
	
	@GetMapping(value = "/listClippingWithAppointment/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> listClippingWithAppointment (@PathVariable int page) {
		
		Page<Clipping> listClippingByAppointment = clippingRepositoryJpa.findAllClippingWhitAppointment(PageRequest.of(page, 2, Sort.by("appointment_created_at").descending()));
		
		return !listClippingByAppointment.isEmpty() ? new ResponseEntity<>(listClippingByAppointment , HttpStatus.OK) : 
												      new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
			
	}
	
	@PutMapping("/updateVisualizedClipping")
	ResponseEntity<?> updateClipping (@Validated @RequestBody Clipping clipping){
		
		clipping.setViewed(true);
		if(clipping.getImportant() == true) {
			clipping.setNotificationViewed(true);
		}
		
		Clipping getClipping = clippingRepositoryJpa.save(clipping);
		return ResponseEntity.ok().body(getClipping);
		
	}
	
	private LocalDate getThirdDayOfTheWeek() {
		
		int quantityDayUtil = 1;
		LocalDate day = LocalDate.now();
		while (quantityDayUtil <= 3) {
			
			if(day.getDayOfWeek() == DayOfWeek.FRIDAY ) {
				day = day.plusDays(3);
				quantityDayUtil++;
			}else if(day.getDayOfWeek() == DayOfWeek.SATURDAY) {
				day = day.plusDays(2);
				quantityDayUtil++;
			}else if(day.getDayOfWeek() == DayOfWeek.SUNDAY) {
				day = day.plusDays(1);
				quantityDayUtil++;
			}else if(day.getDayOfWeek() != DayOfWeek.SATURDAY &&
				     day.getDayOfWeek() != DayOfWeek.SUNDAY ) {
				day = day.plusDays(1);
				quantityDayUtil++;
			}
		}
	
		return day;
	}

}
