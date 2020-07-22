package br.com.test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import br.com.test.model.Clipping;
import br.com.test.model.Customer;
import br.com.test.repository.ClippingRepositoryJpa;
import br.com.test.repository.CustomerRepositoryJpa;
import br.com.test.rest.controller.ClippingController;
import br.com.test.rest.controller.CustomerController;


@SpringBootTest(classes = {ClippingRepositoryJpa.class, ClippingController.class, 
						   CustomerRepositoryJpa.class, CustomerController.class, 
						   TestApplication.class})
public class UnitTest {
	
	@Autowired
	private ClippingRepositoryJpa clippingRepositoryJpa;
	
	@Autowired
	private CustomerRepositoryJpa customerRepositoryJpa;
	
	private Customer customer1;
	private Customer customer2;
	private Customer customer3;
	private Customer customer4;
	

	@Test
	public void insertClipping() {
		
		Customer customer = new Customer("Customer 1");
		customer1 = customerRepositoryJpa.save(customer);
		
		Clipping clipping1 = new Clipping(customer1, LocalDate.now(), "Matter 1", "DEADLINE", null, "", false, false);
		Clipping getclipping1 = clippingRepositoryJpa.save(clipping1);
		Assertions.assertThat(getclipping1.getClippingDate().isEqual(LocalDate.now()));
		
		Assertions.assertThat(getclipping1.getId()).isNotNull();
		Assertions.assertThat(getclipping1.getClippingMatter()).isNotNull();
		
		Assertions.assertThat(getclipping1.getClippingMatter()).isEqualTo(clipping1.getClippingMatter());
		Assertions.assertThat(getclipping1.getClassificationType()).isEqualTo(clipping1.getClassificationType());
		
		
		Clipping clipping2 = new Clipping(LocalDate.now(), "Matter 2", "HEARING", null, "", false, false,
				 						  customer1, LocalDate.now().plusDays(5), "Description Appointment 2", 
				 						  LocalDate.now().plusDays(3), "", null, null);
		Clipping getclipping2 = clippingRepositoryJpa.save(clipping2);
		
		
		Assertions.assertThat(getclipping2.getId()).isNotNull();
		Assertions.assertThat(getclipping2.getClippingMatter()).isNotNull();
		
		Assertions.assertThat(getclipping2.getClippingMatter()).isEqualTo(clipping2.getClippingMatter());
		Assertions.assertThat(getclipping2.getClassificationType()).isEqualTo(clipping2.getClassificationType());
		Assertions.assertThat(getclipping2.getAppointmentDescription()).isNotEmpty();
		Assertions.assertThat(getclipping2.getAppointmentDueDate()).isEqualTo(clipping2.getAppointmentDueDate());
		
		Clipping clipping3 = new Clipping(LocalDate.now(), "Matter 3", "DEADLINE", null, "", true, false,
				  customer1, null, null, null, "Description Notification 3", LocalDate.now().plusDays(1), false);
		
		Clipping getclipping3 = clippingRepositoryJpa.save(clipping3);
		
		Assertions.assertThat(getclipping3.getId()).isNotNull();
		Assertions.assertThat(getclipping3.getClippingDate()).isNotNull().isEqualTo(clipping3.getClippingDate());
		Assertions.assertThat(getclipping3.getClippingMatter()).isNotNull().isEqualTo(clipping3.getClippingMatter());
		
		Assertions.assertThat(getclipping3.getClassificationType()).isEqualTo(clipping3.getClassificationType());
		Assertions.assertThat(getclipping3.getNotificationCreatedAt()).isEqualTo(clipping3.getNotificationCreatedAt());
		Assertions.assertThat(getclipping3.getNotificationViewed()).isEqualTo(clipping3.getNotificationViewed());
		
		Clipping clipping4 = new Clipping(LocalDate.now(), "Matter 4", "DEADLINE", null, "", true, false,
				  customer1, null, null, null, "Description Notification 4", LocalDate.now(), false);
		
		Clipping getclipping4 = clippingRepositoryJpa.save(clipping4);
		
		Assertions.assertThat(getclipping4.getId()).isNotNull();
		Assertions.assertThat(getclipping4.getClippingDate()).isNotNull().isEqualTo(clipping4.getClippingDate());
		Assertions.assertThat(getclipping4.getClippingMatter()).isNotNull().isEqualTo(clipping4.getClippingMatter());
		
		Assertions.assertThat(getclipping4.getClassificationType()).isEqualTo(clipping4.getClassificationType());
		Assertions.assertThat(getclipping4.getNotificationCreatedAt()).isEqualTo(clipping4.getNotificationCreatedAt());
		Assertions.assertThat(getclipping4.getNotificationViewed()).isEqualTo(clipping4.getNotificationViewed());
		
		
		Clipping clipping5 = new Clipping(LocalDate.now(), "Matter 5", "HEARING", null, "", false, false,
				  customer1, LocalDate.now().plusDays(5), "Description Appointment 5", 
				  LocalDate.now().plusDays(3), "", null, null);
		Clipping getclipping5 = clippingRepositoryJpa.save(clipping5);
		Assertions.assertThat(getclipping5.getId()).isNotNull();
		Assertions.assertThat(getclipping5.getClassificationType()).isEqualTo("HEARING");
		
		Clipping clipping6 = new Clipping(LocalDate.now(), "Matter 5", "HEARING", null, "", false, false,
				  customer1, LocalDate.now().plusDays(5), "Description Appointment 5", 
				  LocalDate.now().plusDays(3), "", null, null);
		Clipping getclipping6 = clippingRepositoryJpa.save(clipping6);
		Assertions.assertThat(getclipping6.getId()).isNotNull().isNotNegative();
		Assertions.assertThat(getclipping6.getClassificationType()).isEqualTo("HEARING");
		
	}

	@Test
	public void setWithViwedClipping() {
		
		Customer customer = new Customer("Customer 2");
		customer2 = customerRepositoryJpa.save(customer);
		
		Clipping clipping5 = new Clipping(LocalDate.now(), "Matter 5", "DEADLINE", null, "", true, false,
				customer2, null, null, null, "Description Notification 5", LocalDate.now(), false);
		Clipping getclipping4 = clippingRepositoryJpa.save(clipping5);
		
		getclipping4.setViewed(true);
		getclipping4.setNotificationViewed(true);
		
		Clipping getClippingViewd = clippingRepositoryJpa.save(getclipping4);
		
		Assertions.assertThat(getClippingViewd.getNotificationViewed()).isTrue();
		Assertions.assertThat(getClippingViewd.getViewed()).isTrue();
		
	}
	
	@Test
	public void getClippings() {
		
		Customer customer = new Customer("Customer 3");
		customer3 = customerRepositoryJpa.save(customer);
		
		Clipping clipping1 = new Clipping(LocalDate.now(), "Matter1", "DEADLINE", null, "", true, false,
				customer3, null, null, null, "Description Notification1", LocalDate.now(), false);
		clippingRepositoryJpa.save(clipping1);
		
		Clipping clipping2 = new Clipping(LocalDate.now(), "Matter2", "DEADLINE", null, "", true, false,
				customer3, null, null, null, "Description Notification2", LocalDate.now(), false);
		clippingRepositoryJpa.save(clipping2);
		
		Iterable<Clipping> listClipping = clippingRepositoryJpa.findAllClippingByCustomer(customer3.getId(), null);
		
		for (Clipping clipping : listClipping) {
			System.out.println(clipping.getClippingMatter());
			Assertions.assertThat(clipping.getClippingMatter()).isNotNull();
			Assertions.assertThat(clipping.getClippingDate()).isNotNull();
			Assertions.assertThat(clipping.getViewed()).isNotNull();
		}
		
		
	}
	
	
	@Test
	public void deleteAllClippingByCustomer() {
		
		Customer customer = new Customer("Customer 4");
		customer4 = customerRepositoryJpa.save(customer);
		
		List<Clipping> clippings = new ArrayList<Clipping>();
		
		Clipping clipping1 = new Clipping(LocalDate.now(), "Matter 5", "DEADLINE", null, "", true, false,
				customer4, null, null, null, "Description Notification 5", LocalDate.now(), false);
		Clipping getclipping1 = clippingRepositoryJpa.save(clipping1);
		
		Clipping clipping2 = new Clipping(LocalDate.now(), "Matter 5", "DEADLINE", null, "", true, false,
				customer4, null, null, null, "Description Notification 5", LocalDate.now(), false);
		Clipping getclipping2 = clippingRepositoryJpa.save(clipping2);
		
		clippings.add(getclipping1);
		clippings.add(getclipping2);
		
		clippingRepositoryJpa.deleteAll(clippings);
		
	}
	
	@Test
	public void deleteOneClippingByCustomer() {
		
		Customer customer = new Customer("Customer 5");
		Customer customer5 = customerRepositoryJpa.save(customer);
		
		Clipping clipping = new Clipping(customer5, LocalDate.now(), "Matter Delete", "DEADLINE", 
										 null, "", false, false);

		Clipping getclipping = clippingRepositoryJpa.save(clipping);
		
		clippingRepositoryJpa.deleteById(getclipping.getId());
		
	}
	
	@Test
	public void getAllClippingWithNotification() {
		
		Page<Clipping> listClippingNotification = clippingRepositoryJpa.findAllClippingWhitNotification(null);
		
		for (Clipping clipping : listClippingNotification) {
			System.out.println(clipping.getClippingMatter());
			Assertions.assertThat(clipping.getClippingMatter()).isNotNull();
			Assertions.assertThat(clipping.getClippingDate()).isNotNull();
			Assertions.assertThat(clipping.getViewed()).isNotNull();
		}
		
	}
	
	@Test
	public void getAllClippingWithAppointment() {
		
		Page<Clipping> listClippingAppointment = clippingRepositoryJpa.findAllClippingWhitAppointment(null);
		
		for (Clipping clipping : listClippingAppointment) {
			System.out.println(clipping.getClippingMatter());
			Assertions.assertThat(clipping.getClippingMatter()).isNotNull();
			Assertions.assertThat(clipping.getClippingDate()).isNotNull();
			Assertions.assertThat(clipping.getViewed()).isNotNull();
		}
		
	}
	
}
