//package sba301.trandinhduyphuong;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import sba301.trandinhduyphuong.pojos.Employee;
//import sba301.trandinhduyphuong.services.IEmployeeService;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//
//@SpringBootTest
//public class EmployeeServiceTest {
//    @Autowired
//    private IEmployeeService employeeService;
//
//    @Test
//    public void testfindAll(){
//        Page<Employee> employeePage =
//                employeeService.getAllEmployees((PageRequest.of(0, 10)));
//        assertThat(employeePage).isNotNull();
//    }
//}
