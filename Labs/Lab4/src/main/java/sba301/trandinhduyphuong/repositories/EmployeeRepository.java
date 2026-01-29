package sba301.trandinhduyphuong.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import sba301.trandinhduyphuong.pojos.Employee;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class EmployeeRepository implements IEmployeeRepository {
    private List<Employee> employees = createList();

    private static List<Employee> createList() {
        List<Employee> tempEmployees = new ArrayList<>();
        Collections.addAll(tempEmployees,
                new Employee("E001", "John Doe", "Developer", 60000.0),
                new Employee("E002", "Jane Smith", "Manager", 80000.0),
                new Employee("E003", "Mike Johnson", "Analyst", 55000.0));
        return tempEmployees;
    }

    public Employee getEmployeeById(String empId) {
        Employee tempEmployee = null;
        for (Employee employee : employees) {
            if (employee.getEmpId().equals(empId)){
                tempEmployee = employee;
                break;
            }
        }
        return tempEmployee;
    }

    public Employee delete(String empId) {
        Employee tempEmployee = null;
        for (Employee employee : employees) {
            if (employee.getEmpId().equals(empId)) {
                tempEmployee = employee;
                employees.remove(employee);
                break;
            }
        }
        return tempEmployee;
    }

    public Employee create(Employee user) {
        employees.add(user);
        System.out.println(employees);
        return user;
    }

    public List<Employee> getAllEmployee() {
        return employees;
    }

    @Override
    public List<Employee> findAll(Sort sort) {
        return employees;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> allEmployees = createList();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allEmployees.size());
        List<Employee> pageContent = allEmployees.subList(start, end);
        return new org.springframework.data.domain.PageImpl<>(pageContent, pageable, allEmployees.size());
    }
}
