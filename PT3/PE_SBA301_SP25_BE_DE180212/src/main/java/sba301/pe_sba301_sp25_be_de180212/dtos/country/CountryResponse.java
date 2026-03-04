package sba301.pe_sba301_sp25_be_de180212.dtos.country;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CountryResponse {

    private Integer countryId;

    private String countryName;

}
