package br.com.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.test.model.Customer;

@Repository
public interface CustomerRepositoryJpa extends JpaRepository<Customer, Long>{

}
