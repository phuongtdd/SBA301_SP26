package sba301.fuminihotelsystem.dtos.booking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetailResponse {
    private Integer bookingDetailId;
    private Integer roomId;
    private String roomNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal actualPrice;
}
