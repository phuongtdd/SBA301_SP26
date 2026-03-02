package sba301.fuminihotelsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RoomInformation")
public class RoomInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomID")
    private Integer roomId;

    @NotBlank(message = "Room number is required")
    @Size(max = 50, message = "Room number must not exceed 50 characters")
    @Column(name = "RoomNumber", length = 50)
    private String roomNumber;

    @Size(max = 220, message = "Room description must not exceed 220 characters")
    @Column(name = "RoomDetailDescription", length = 220)
    private String roomDetailDescription;

    @NotNull(message = "Room max capacity is required")
    @Min(value = 1, message = "Room max capacity must be at least 1")
    @Column(name = "RoomMaxCapacity")
    private Integer roomMaxCapacity;

    @Column(name = "RoomStatus")
    private Byte roomStatus;

    @NotNull(message = "Room price per day is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Room price must be greater than 0")
    @Column(name = "RoomPricePerDay")
    private BigDecimal roomPricePerDay;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RoomTypeID")
    @JsonIgnoreProperties("roomInformationList")
    private RoomType roomType;

    @JsonIgnoreProperties("roomInformation")
    @OneToMany(mappedBy = "roomInformation")
    private List<BookingDetail> bookingDetails;
}