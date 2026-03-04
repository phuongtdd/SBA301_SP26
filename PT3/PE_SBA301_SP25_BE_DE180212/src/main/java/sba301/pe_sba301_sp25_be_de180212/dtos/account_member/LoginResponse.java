package sba301.pe_sba301_sp25_be_de180212.dtos.account_member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    String token;
    boolean authenticated;
}
