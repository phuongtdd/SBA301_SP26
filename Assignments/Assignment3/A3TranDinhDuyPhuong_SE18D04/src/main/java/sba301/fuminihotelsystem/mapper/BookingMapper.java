package sba301.fuminihotelsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import sba301.fuminihotelsystem.dtos.booking.BookingDetailResponse;
import sba301.fuminihotelsystem.dtos.booking.BookingResponse;
import sba301.fuminihotelsystem.entities.BookingDetail;
import sba301.fuminihotelsystem.entities.BookingReservation;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface BookingMapper {

    @Mapping(target = "customerId", source = "customer.customerId")
    @Mapping(target = "customerName", source = "customer.customerFullName")
    BookingResponse toBookingResponse(BookingReservation booking);

    @Mapping(target = "roomId", source = "roomInformation.roomId")
    @Mapping(target = "roomNumber", source = "roomInformation.roomNumber")
    BookingDetailResponse toBookingDetailResponse(BookingDetail detail);
}
