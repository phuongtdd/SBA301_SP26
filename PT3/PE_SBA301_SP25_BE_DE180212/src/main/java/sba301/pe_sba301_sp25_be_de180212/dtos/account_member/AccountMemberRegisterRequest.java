package sba301.pe_sba301_sp25_be_de180212.dtos.account_member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AccountMemberRegisterRequest {


    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 50, message = "Email must not exceed 50 characters")
    private String emailAddress;


    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 30, message = "Password must be between 6 and 30 characters")
    private String memberPassword;
}
