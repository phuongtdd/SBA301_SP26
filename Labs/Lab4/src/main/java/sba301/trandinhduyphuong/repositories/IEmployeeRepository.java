package sba301.trandinhduyphuong.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import sba301.trandinhduyphuong.pojos.Employee;

import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    public Employee getEmployeeById(String empId);

    public Employee delete(String empId);

    public Employee create(Employee user);

    public List<Employee> getAllEmployee();
}
