package sba301.fuminihotelsystem.dtos.customer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    //Có thể email hoặc username, xác định trên identifier
    @NotBlank(message = "Email is required")
    @Size(min = 6, max = 100, message = "Username or email must be between 6 and 100 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 30, message = "Password must be between 6 and 30 characters")
    private String password;

}
