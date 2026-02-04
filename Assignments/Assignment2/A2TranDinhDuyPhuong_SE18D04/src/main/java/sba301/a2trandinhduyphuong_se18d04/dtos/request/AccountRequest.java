package sba301.a2trandinhduyphuong_se18d04.dtos.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRequest {

    @NotBlank(message = "Account name is required")
    @Size(min = 2, max = 100, message = "Account name must be between 2 and 100 characters")
    private String accountName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String accountEmail;

    @NotNull(message = "Account role is required")
    @Min(value = 1, message = "Role must be 1 (Admin) or 2 (Staff)")
    @Max(value = 2, message = "Role must be 1 (Admin) or 2 (Staff)")
    private Integer accountRole;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 255, message = "Password must be at least 6 characters")
    private String accountPassword;

}
