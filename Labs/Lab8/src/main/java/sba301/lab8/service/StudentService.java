package sba301.lab8.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import sba301.lab8.pojo.Student;
import sba301.lab8.repository.IStudentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StudentService implements IStudentService {
    private IStudentRepository studentRepository;


    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public void save(Student student) {
        studentRepository.save(student);
    }

    @Override
    public void delete(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public Student findByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    @Override
    public Student update(String email, Student student) {
        Student stud = studentRepository.findByEmail(email);
        if (stud != null) {
            stud.setFirstName(student.getFirstName());
            stud.setLastName(student.getLastName());
            stud.setEmail(student.getEmail());
            studentRepository.save(stud);
            return stud;
        }
        return null;
    }
}
