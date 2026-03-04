package sba301.pe_sba301_sp25_be_de180212.dtos.cars;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sba301.pe_sba301_sp25_be_de180212.entities.Country;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarRequest {

    @jakarta.validation.constraints.NotBlank(message = "Car name is required")
    @jakarta.validation.constraints.Size(min = 11, message = "Car name must be longer than 10 characters")
    private String carName;

    @jakarta.validation.constraints.NotNull(message = "Units in stock is required")
    @jakarta.validation.constraints.Min(value = 5, message = "Units in stock must be at least 5")
    @jakarta.validation.constraints.Max(value = 20, message = "Units in stock must be at most 20")
    private Integer unitsInStock;

    @jakarta.validation.constraints.NotNull(message = "Unit price is required")
    private Integer unitPrice;

    @jakarta.validation.constraints.NotNull(message = "Country ID is required")
    private Integer countryId;

}
