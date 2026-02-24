package sba301.lab7.repository;

import sba301.lab7.pojo.Student;

import java.util.List;

// Interface định nghĩa các hành động Persistence (CRUD)
public interface IStudentRepository {
    void save(Student student);
    void update(Student student);
    void delete(Student student);
    Student findById(int studentId);
    Student findByEmail(String email);
    List<Student> findAll();
    Student findByIdWithBooks(int studentId); // Phương thức mới để lấy Student kèm theo danh sách Books
}
