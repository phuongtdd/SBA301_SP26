package sba301.pe_sba301_sp25_be_de180212.dtos.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RefreshTokenRequest {

    private String token;
}
