package sba301.trandinhduyphuong.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import sba301.trandinhduyphuong.pojos.Employee;
import sba301.trandinhduyphuong.repositories.EmployeeRepository;
import sba301.trandinhduyphuong.repositories.IEmployeeRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    private IEmployeeRepository employeeRepository;

    @Override
    public Employee getEmployeeById(String empId) {
        return employeeRepository.getEmployeeById(empId);
    }

    @Override
    public Employee delete(String empId) {
        return employeeRepository.delete(empId);
    }

    @Override
    public Employee create(Employee user) {
        return employeeRepository.create(user);
    }

    @Override
    public Page<Employee> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }
}
