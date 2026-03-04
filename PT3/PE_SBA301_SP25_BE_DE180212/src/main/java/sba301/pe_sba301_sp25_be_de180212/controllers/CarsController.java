package sba301.pe_sba301_sp25_be_de180212.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sba301.pe_sba301_sp25_be_de180212.common.ApiResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarResponse;
import sba301.pe_sba301_sp25_be_de180212.services.CarService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cars")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CarsController {

    CarService carService;

    // ADMIN: Create cars
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create new car (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ApiResponse<CarResponse> createCar(@Valid @RequestBody CarRequest request) {
        return ApiResponse.created(carService.addCar(request));
    }

    @GetMapping
    @Operation(summary = "Get all cars", security = @SecurityRequirement(name = "bearerAuth"))
    public ApiResponse<List<CarResponse>> getAllCars() {
        return ApiResponse.ok(carService.getAllCars());
    }

    @DeleteMapping("/{carId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete car", security = @SecurityRequirement(name = "bearerAuth"))
    public ApiResponse<CarResponse> deleteCar(@PathVariable Integer carId) {
        return ApiResponse.deleted(carService.deleteCar(carId));
    }

}
