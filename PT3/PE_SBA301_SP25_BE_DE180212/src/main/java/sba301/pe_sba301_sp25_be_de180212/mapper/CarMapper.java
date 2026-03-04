package sba301.pe_sba301_sp25_be_de180212.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.cars.CarResponse;
import sba301.pe_sba301_sp25_be_de180212.entities.Cars;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface CarMapper {

    CarResponse toCarResponse(Cars cars);

    @org.mapstruct.Mapping(target = "carId", ignore = true)
    @org.mapstruct.Mapping(target = "country", ignore = true)
    @org.mapstruct.Mapping(target = "createdAt", ignore = true)
    @org.mapstruct.Mapping(target = "updatedAt", ignore = true)
    Cars toCars(CarRequest carRequest);

    @org.mapstruct.Mapping(target = "carId", ignore = true)
    @org.mapstruct.Mapping(target = "country", ignore = true)
    @org.mapstruct.Mapping(target = "createdAt", ignore = true)
    @org.mapstruct.Mapping(target = "updatedAt", ignore = true)
    void updateCar(@MappingTarget Cars cars, CarRequest carRequest);
}
