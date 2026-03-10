package sba301.lab8.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import sba301.lab8.pojo.Student;

public interface IStudentRepository extends MongoRepository<Student, String> {
    // Tìm Student theo email
    Student findByEmail(String email);
}
