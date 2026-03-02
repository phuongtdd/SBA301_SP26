package sba301.fuminihotelsystem.services;

import sba301.fuminihotelsystem.dtos.customer.CustomerRegisterRequest;
import sba301.fuminihotelsystem.dtos.customer.CustomerUpdateRequest;
import sba301.fuminihotelsystem.entities.Customer;

import java.util.List;

public interface CustomerService {

    Customer registerCustomer(CustomerRegisterRequest request);

    Customer getCustomerProfile(Integer id);

    Customer getCustomerByEmail(String email);

    Customer updateCustomerProfile(Integer id, CustomerUpdateRequest request);

    List<Customer> getAllCustomers();

    void deleteCustomer(Integer id);
}