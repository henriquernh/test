package br.com.test.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.test.model.Clipping;

@Repository
public interface ClippingRepositoryJpa extends JpaRepository<Clipping, Long>{

	@Query(value = "SELECT * FROM clipping WHERE customer_id = :customerId ", nativeQuery = true)
	Page<Clipping> findAllClippingByCustomer(@Param("customerId") Long customerId, Pageable pageable);
	
	@Query(value = "SELECT * FROM clipping WHERE notification_description != ''", nativeQuery = true)
	Page<Clipping> findAllClippingWhitNotification(Pageable pageable);
	
	@Query(value = "SELECT * FROM clipping WHERE appointment_description != ''", nativeQuery = true)
	Page<Clipping> findAllClippingWhitAppointment(Pageable pageable);
	
}
