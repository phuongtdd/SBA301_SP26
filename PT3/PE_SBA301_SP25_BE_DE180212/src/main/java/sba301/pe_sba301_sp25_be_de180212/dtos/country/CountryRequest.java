package sba301.pe_sba301_sp25_be_de180212.dtos.country;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CountryRequest {
    private String countryName;
}
