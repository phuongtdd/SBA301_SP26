package sba301.lab8.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "students") // Chỉ định tên collection trong MongoDB
public class Student {
    @Id
    private int id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Double marks; // Điểm trung bình

}
