package sba301.fuminihotelsystem.dtos.customer;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerUpdateRequest {

    @NotBlank(message = "Full name is required")
    @Size(max = 50, message = "Full name must not exceed 50 characters")
    private String customerFullName;

    @NotBlank(message = "Telephone is required")
    @Size(max = 12, message = "Telephone must not exceed 12 characters")
    private String telephone;

    @Past(message = "Birthday must be in the past")
    private LocalDate customerBirthday;
}
