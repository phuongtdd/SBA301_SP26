package sba301.trandinhduyphuong.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import sba301.trandinhduyphuong.pojos.Employee;

import java.util.List;

public interface IEmployeeService {
    public Employee getEmployeeById(String empId);
    public Employee delete(String empId);
    public Employee create(Employee user);
    public Page<Employee> getAllEmployees(Pageable pageable);
}
