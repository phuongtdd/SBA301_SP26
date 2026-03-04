package sba301.pe_sba301_sp25_be_de180212.dtos.cars;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sba301.pe_sba301_sp25_be_de180212.dtos.country.CountryResponse;
import sba301.pe_sba301_sp25_be_de180212.entities.Country;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarResponse {
    private Integer carId;

    private String carName;

    private Integer unitsInStock;

    private Integer unitPrice;

    private CountryResponse country;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
