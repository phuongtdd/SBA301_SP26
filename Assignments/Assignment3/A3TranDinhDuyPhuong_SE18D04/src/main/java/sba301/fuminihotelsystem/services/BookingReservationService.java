package sba301.fuminihotelsystem.services;

import sba301.fuminihotelsystem.dtos.booking.BookingRequest;
import sba301.fuminihotelsystem.entities.BookingReservation;

import java.util.List;

public interface BookingReservationService {

    BookingReservation createBooking(Integer customerId, BookingRequest request);

    List<BookingReservation> getAllBookings();

    BookingReservation getBookingById(Integer id);

    List<BookingReservation> getBookingsByCustomerId(Integer customerId);

    BookingReservation updateBookingStatus(Integer id, Byte status);
}
