package sba301.fuminihotelsystem.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sba301.fuminihotelsystem.dtos.customer.CustomerRegisterRequest;
import sba301.fuminihotelsystem.dtos.customer.CustomerUpdateRequest;
import sba301.fuminihotelsystem.entities.Customer;
import sba301.fuminihotelsystem.exception.AppException;
import sba301.fuminihotelsystem.exception.ErrorCode;
import sba301.fuminihotelsystem.repositories.CustomerRepository;
import sba301.fuminihotelsystem.services.CustomerService;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Customer registerCustomer(CustomerRegisterRequest request) {
        // Check if email already exists
        if (customerRepository.findByEmailAddress(request.getEmailAddress()).isPresent()) {
            throw new AppException(ErrorCode.CUSTOMER_ALREADY_EXISTS);
        }

        Customer customer = new Customer();
        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setCustomerStatus((byte) 1);

        return customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerProfile(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
    }

    @Override
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
    }

    @Override
    public Customer updateCustomerProfile(Integer id, CustomerUpdateRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setCustomerBirthday(request.getCustomerBirthday());

        return customerRepository.save(customer);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public void deleteCustomer(Integer id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        customerRepository.delete(customer);
    }

}