package sba301.fuminihotelsystem.dtos.customer;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRegisterRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 50, message = "Full name must not exceed 50 characters")
    private String customerFullName;

    @NotBlank(message = "Telephone is required")
    @Size(max = 12, message = "Telephone must not exceed 12 characters")
    private String telephone;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    private String emailAddress;

    @Past(message = "Birthday must be in the past")
    private LocalDate customerBirthday;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 30, message = "Password must be between 6 and 30 characters")
    private String password;
}
