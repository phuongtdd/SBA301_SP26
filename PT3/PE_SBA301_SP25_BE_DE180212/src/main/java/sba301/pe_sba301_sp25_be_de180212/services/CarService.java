package sba301.pe_sba301_sp25_be_de180212.services;

import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarResponse;

import java.util.List;

public interface CarService {

    CarResponse addCar(CarRequest carRequest);

    CarResponse updateCar(Integer carId, CarRequest carRequest);

    CarResponse deleteCar(Integer carId);

    List<CarResponse> getAllCars();
}
