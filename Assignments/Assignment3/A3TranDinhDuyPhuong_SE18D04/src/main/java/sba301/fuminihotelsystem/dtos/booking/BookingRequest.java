package sba301.fuminihotelsystem.dtos.booking;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {

    @NotEmpty(message = "Booking must have at least one room")
    @Valid
    private List<BookingDetailRequest> bookingDetails;
}
