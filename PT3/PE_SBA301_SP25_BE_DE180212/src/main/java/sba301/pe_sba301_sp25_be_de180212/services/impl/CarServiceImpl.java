package sba301.pe_sba301_sp25_be_de180212.services.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarResponse;
import sba301.pe_sba301_sp25_be_de180212.entities.Cars;
import sba301.pe_sba301_sp25_be_de180212.entities.Country;
import sba301.pe_sba301_sp25_be_de180212.mapper.CarMapper;
import sba301.pe_sba301_sp25_be_de180212.repositories.CarRepository;
import sba301.pe_sba301_sp25_be_de180212.repositories.CountryRepository;
import sba301.pe_sba301_sp25_be_de180212.services.CarService;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CarServiceImpl implements CarService {

    CarRepository carRepository;
    CountryRepository countryRepository;
    CarMapper carMapper;

    @Override
    public CarResponse addCar(CarRequest carRequest) {
        Country country = countryRepository.findById(carRequest.getCountryId())
                .orElseThrow(() -> new RuntimeException("Country not found"));
        Cars addedCar = carMapper.toCars(carRequest);
        addedCar.setCountry(country);

        java.time.LocalDateTime now = java.time.LocalDateTime.now();
        addedCar.setCreatedAt(now);
        addedCar.setUpdatedAt(now);

        return carMapper.toCarResponse(carRepository.save(addedCar));
    }

    @Override
    public CarResponse updateCar(Integer carId, CarRequest carRequest) {
        // Example of manual check as requested:
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // if (auth != null && auth.getAuthorities().stream().anyMatch(a ->
        // a.getAuthority().equals("ROLE_ADMIN"))) {
        // log.info("Admin is updating car");
        // }

        Cars updatedCar = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        carMapper.updateCar(updatedCar, carRequest);
        updatedCar.setUpdatedAt(java.time.LocalDateTime.now());
        return carMapper.toCarResponse(carRepository.save(updatedCar));
    }

    @Override
    public CarResponse deleteCar(Integer carId) {
        Cars deletedCar = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        carRepository.delete(deletedCar);
        return carMapper.toCarResponse(deletedCar);
    }

    @Override
    public List<CarResponse> getAllCars() {
        return carRepository
                .findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC,
                        "createdAt"))
                .stream().map(carMapper::toCarResponse).toList();
    }
}
