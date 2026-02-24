package sba301.lab7.repository;

import sba301.lab7.dao.StudentDAO;
import sba301.lab7.pojo.Student;

import java.util.List;

public class StudentRepository implements IStudentRepository {

    // Tham chiếu đến tầng Persistence/DAO
    private StudentDAO studentDAO = new StudentDAO();
    // Trong môi trường thực tế và Spring Boot, đây sẽ là Dependency Injection, không phải new()

    // --- Triển khai các phương thức từ IStudentRepository ---

    @Override
    public void save(Student student) {
        // Chỉ đơn thuần chuyển tiếp yêu cầu xuống tầng DAO
        studentDAO.save(student);
    }

    @Override
    public void update(Student student) {
        // Chuyển tiếp yêu cầu Update
        studentDAO.update(student);
    }

    @Override
    public void delete(Student student) {
        // Chuyển tiếp yêu cầu Delete
        studentDAO.delete(student);
    }

    @Override
    public Student findById(int studentId) {
        // Logic tìm kiếm theo ID cần được triển khai trong StudentDAO,
        // giả sử chúng ta thêm phương thức getById(int id) vào DAO
        return studentDAO.getById(studentId);
    }

    @Override
    public Student findByEmail(String email) {
        // Chuyển tiếp yêu cầu tìm kiếm theo Email
        return studentDAO.findByEmail(email);
    }

    @Override
    public List<Student> findAll() {
        // Chuyển tiếp yêu cầu lấy tất cả danh sách
        return studentDAO.getAll();
    }

    @Override
    public Student findByIdWithBooks(int studentId) {
        // Phương thức này sẽ yêu cầu DAO thực hiện truy vấn với JOIN để lấy Student kèm theo Books
        return studentDAO.findByIdWithBooks(studentId);
    }
}
