package sba301.fuminihotelsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BookingDetail")
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingDetailID")
    private Integer bookingDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BookingReservationID")
    @JsonIgnoreProperties("bookingDetails")
    private BookingReservation bookingReservation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RoomID")
    @JsonIgnoreProperties({ "bookingDetails" })
    private RoomInformation roomInformation;

    @NotNull(message = "Start date is required")
    @Column(name = "StartDate")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @Column(name = "EndDate")
    private LocalDate endDate;

    @Column(name = "ActualPrice")
    private BigDecimal actualPrice;
}