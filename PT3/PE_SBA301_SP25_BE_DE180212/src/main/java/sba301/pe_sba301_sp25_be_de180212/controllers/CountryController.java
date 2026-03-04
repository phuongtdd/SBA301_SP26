package sba301.pe_sba301_sp25_be_de180212.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sba301.pe_sba301_sp25_be_de180212.common.ApiResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.country.CountryResponse;
import sba301.pe_sba301_sp25_be_de180212.services.CountryService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/countries")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CountryController {

    CountryService countryService;

    @GetMapping
    @Operation(summary = "Get all countries", security = @SecurityRequirement(name = "bearerAuth"))
    public ApiResponse<List<CountryResponse>> getAllCountries() {
        return ApiResponse.ok(countryService.getAllCountries());
    }
}
