package sba301.trandinhduyphuong.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import sba301.trandinhduyphuong.pojos.Employee;
import sba301.trandinhduyphuong.services.IEmployeeService;

import java.util.List;

@RestController
@Tag(name = "Employee Operations", description = "APIs for managing employees")
public class EmployeeController {

    @Autowired
    private IEmployeeService employeeService;

    @GetMapping(value = "/employees", produces = "application/json")
    public Page<Employee> firstPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") List<String> sort) {

        Sort.Order order = new Sort.Order(Sort.Direction.ASC, sort.get(0));
        Pageable pageable = PageRequest.of(page, size, Sort.by(order));
        return employeeService.getAllEmployees(pageable);
    }
    @Operation(summary = "Get an employee by ID", operationId = "getEmployeeById", tags = { "employees" }, responses = {
            @ApiResponse(responseCode = "200", description = "Successful retrieval of employee", content = @Content(schema = @Schema(implementation = Employee.class))),
            @ApiResponse(responseCode = "400", description = "Employee not found")
    })
    @GetMapping("/employees/{empId}")
    public Employee getEmployeeById(@PathVariable String empId) {
        return employeeService.getEmployeeById(empId);
    }

    @DeleteMapping(path = { "/employees/{empId}" })
    public Employee deleteEmployee(@PathVariable String empId) {
        return employeeService.delete(empId);
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }
}
