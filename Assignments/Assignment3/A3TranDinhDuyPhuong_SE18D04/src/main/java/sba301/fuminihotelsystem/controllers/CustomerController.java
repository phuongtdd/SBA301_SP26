package sba301.fuminihotelsystem.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import sba301.fuminihotelsystem.dtos.customer.CustomerRegisterRequest;
import sba301.fuminihotelsystem.dtos.customer.CustomerResponse;
import sba301.fuminihotelsystem.dtos.customer.CustomerUpdateRequest;
import sba301.fuminihotelsystem.entities.Customer;
import sba301.fuminihotelsystem.services.CustomerService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private sba301.fuminihotelsystem.mapper.CustomerMapper customerMapper;

    // PUBLIC: Customer register account
    @PostMapping("/register")
    @Operation(summary = "Register a new customer account")
    public ResponseEntity<CustomerResponse> register(@Valid @RequestBody CustomerRegisterRequest request) {
        Customer customer = customerService.registerCustomer(request);
        return new ResponseEntity<>(customerMapper.toCustomerResponse(customer), HttpStatus.CREATED);
    }

    // STAFF: Get all customers
    @GetMapping
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Get all customers (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        List<CustomerResponse> responses = customerService.getAllCustomers().stream()
                .map(customerMapper::toCustomerResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // STAFF: Get customer by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Get customer by ID (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<CustomerResponse> getCustomerById(@PathVariable Integer id) {
        Customer customer = customerService.getCustomerProfile(id);
        return new ResponseEntity<>(customerMapper.toCustomerResponse(customer), HttpStatus.OK);
    }

    // CUSTOMER: Get own profile from JWT token
    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Get own profile (Customer only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<CustomerResponse> getMyProfile(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getSubject();
        Customer customer = customerService.getCustomerByEmail(email);
        return new ResponseEntity<>(customerMapper.toCustomerResponse(customer), HttpStatus.OK);
    }

    // CUSTOMER: Update own profile
    @PutMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Update own profile (Customer only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<CustomerResponse> updateMyProfile(Authentication authentication,
            @Valid @RequestBody CustomerUpdateRequest request) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getSubject();
        Customer customer = customerService.getCustomerByEmail(email);
        Customer updatedCustomer = customerService.updateCustomerProfile(customer.getCustomerId(), request);
        return new ResponseEntity<>(customerMapper.toCustomerResponse(updatedCustomer), HttpStatus.OK);
    }

    // STAFF: Update customer by ID
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Update customer by ID (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable Integer id,
            @Valid @RequestBody CustomerUpdateRequest request) {
        Customer updatedCustomer = customerService.updateCustomerProfile(id, request);
        return new ResponseEntity<>(customerMapper.toCustomerResponse(updatedCustomer), HttpStatus.OK);
    }

    // STAFF: Delete customer
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Delete customer (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>("Customer deleted successfully", HttpStatus.OK);
    }
}
