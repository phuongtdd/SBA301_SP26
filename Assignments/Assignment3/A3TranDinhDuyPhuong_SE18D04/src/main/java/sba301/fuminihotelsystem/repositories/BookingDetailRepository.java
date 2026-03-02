package sba301.fuminihotelsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sba301.fuminihotelsystem.entities.BookingDetail;

import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, Integer> {
    List<BookingDetail> findByBookingReservation_BookingReservationId(Integer bookingReservationId);

    List<BookingDetail> findByRoomInformation_RoomId(Integer roomId);

    @org.springframework.data.jpa.repository.Query("SELECT COUNT(bd) FROM BookingDetail bd " +
            "WHERE bd.roomInformation.roomId = :roomId " +
            "AND bd.bookingReservation.bookingStatus = 1 " + // Only active bookings
            "AND ((bd.startDate < :endDate AND bd.endDate > :startDate))")
    long countOverlappingBookings(Integer roomId, java.time.LocalDate startDate, java.time.LocalDate endDate);
}
