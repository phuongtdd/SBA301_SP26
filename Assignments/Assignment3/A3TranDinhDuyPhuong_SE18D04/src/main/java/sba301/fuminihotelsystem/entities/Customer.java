package sba301.fuminihotelsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CustomerID")
    private Integer customerId;

    @NotBlank(message = "Customer full name is required")
    @Size(max = 50, message = "Customer full name must not exceed 50 characters")
    @Column(name = "CustomerFullName", length = 50)
    private String customerFullName;

    @NotBlank(message = "Telephone is required")
    @Size(max = 12, message = "Telephone must not exceed 12 characters")
    @Column(name = "Telephone", length = 12)
    private String telephone;

    @NotBlank(message = "Email address is required")
    @Email(message = "Email address must be valid")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    @Column(name = "EmailAddress", length = 50, unique = true)
    private String emailAddress;

    @Past(message = "Birthday must be in the past")
    @Column(name = "CustomerBirthday")
    private LocalDate customerBirthday;

    @Column(name = "CustomerStatus")
    private Byte customerStatus;

    @JsonIgnore
    @NotBlank(message = "Password is required")
    @Column(name = "Password")
    private String password;

    @JsonIgnoreProperties("customer")
    @OneToMany(mappedBy = "customer")
    private List<BookingReservation> bookingReservations;
}
