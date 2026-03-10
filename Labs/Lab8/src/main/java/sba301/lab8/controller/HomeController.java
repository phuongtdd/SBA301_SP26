package sba301.lab8.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import sba301.lab8.pojo.Student;
import sba301.lab8.service.IStudentService;

import java.util.List;

@Controller
public class HomeController {

    @Autowired
    private IStudentService studentService;

    @GetMapping("/")
    public ModelAndView showStudent(HttpServletResponse resp) {
        List<Student> studentList = studentService.findAll();
        ModelAndView modelAndView = new ModelAndView("home");
        modelAndView.addObject("studentList", studentList);
        return modelAndView;
    }

    @RequestMapping(value = "/manageStudent")
    public String manageStudent(HttpServletRequest request) {
        String type = request.getParameter("btnManageStudent");
        String idParam = request.getParameter("txtId");
        String markParam = request.getParameter("txtMark");
        
        int studentId = (idParam != null && !idParam.trim().isEmpty()) ? Integer.parseInt(idParam) : 0;
        Double marks = (markParam != null && !markParam.trim().isEmpty()) ? Double.parseDouble(markParam) : 0.0;
        
        String email = request.getParameter("txtEmail");
        String firstName = request.getParameter("txtFirstName");
        String lastName = request.getParameter("txtLastName");
        String password = request.getParameter("txtPassword");
        Student student = new Student(studentId, email, firstName, lastName, password, marks);
        switch (type) {
            case "add":
                studentService.save(student);
                break;

            case "update":
                studentService.update(email, student);
                break;

            case "delete":
                studentService.delete(student);
                break;
            default:
                break;
        }
        return "redirect:/";
    }
}
