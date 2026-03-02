package sba301.fuminihotelsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import sba301.fuminihotelsystem.dtos.customer.CustomerResponse;
import sba301.fuminihotelsystem.entities.Customer;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface CustomerMapper {
    CustomerResponse toCustomerResponse(Customer customer);
}
