package sba301.fuminihotelsystem.dtos.room;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {

    @NotBlank(message = "Room number is required")
    @Size(max = 50, message = "Room number must not exceed 50 characters")
    private String roomNumber;

    @Size(max = 220, message = "Room description must not exceed 220 characters")
    private String roomDetailDescription;

    @NotNull(message = "Room max capacity is required")
    @Min(value = 1, message = "Room max capacity must be at least 1")
    private Integer roomMaxCapacity;

    private Byte roomStatus;

    @NotNull(message = "Room price per day is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Room price must be greater than 0")
    private BigDecimal roomPricePerDay;

    @NotNull(message = "Room type ID is required")
    private Integer roomTypeId;
}
