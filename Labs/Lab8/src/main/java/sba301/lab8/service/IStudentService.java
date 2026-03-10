package sba301.lab8.service;

import sba301.lab8.pojo.Student;

import java.util.List;

public interface IStudentService {
    public List<Student> findAll();
    public void save(Student student);
    public void delete(Student student);
    public Student findByEmail(String email);
    public Student update(String email, Student student);
}
