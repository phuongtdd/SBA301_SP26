package sba301.fuminihotelsystem.services.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sba301.fuminihotelsystem.dtos.booking.BookingDetailRequest;
import sba301.fuminihotelsystem.dtos.booking.BookingRequest;
import sba301.fuminihotelsystem.entities.BookingDetail;
import sba301.fuminihotelsystem.entities.BookingReservation;
import sba301.fuminihotelsystem.entities.Customer;
import sba301.fuminihotelsystem.entities.RoomInformation;
import sba301.fuminihotelsystem.exception.AppException;
import sba301.fuminihotelsystem.exception.ErrorCode;
import sba301.fuminihotelsystem.repositories.BookingReservationRepository;
import sba301.fuminihotelsystem.repositories.CustomerRepository;
import sba301.fuminihotelsystem.repositories.RoomInformationRepository;
import sba301.fuminihotelsystem.services.BookingReservationService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingReservationServiceImpl implements BookingReservationService {

    @Autowired
    private BookingReservationRepository bookingReservationRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private RoomInformationRepository roomInformationRepository;

    @Autowired
    private sba301.fuminihotelsystem.repositories.BookingDetailRepository bookingDetailRepository;

    @Override
    @Transactional
    public BookingReservation createBooking(Integer customerId, BookingRequest request) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        BookingReservation reservation = new BookingReservation();
        reservation.setCustomer(customer);
        reservation.setBookingDate(LocalDate.now());
        reservation.setBookingStatus((byte) 1); // 1 = Active/Confirmed

        List<BookingDetail> details = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (BookingDetailRequest detailReq : request.getBookingDetails()) {
            RoomInformation room = roomInformationRepository.findById(detailReq.getRoomId())
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

            // Check availability
            long overlaps = bookingDetailRepository.countOverlappingBookings(
                    detailReq.getRoomId(), detailReq.getStartDate(), detailReq.getEndDate());

            if (overlaps > 0) {
                throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
            }

            long days = ChronoUnit.DAYS.between(detailReq.getStartDate(), detailReq.getEndDate());
            if (days <= 0) {
                throw new AppException(ErrorCode.UNCAUGHT_EXCEPTION); // Could add a specific DATE_RANGE_INVALID
            }

            BigDecimal actualPrice = room.getRoomPricePerDay().multiply(BigDecimal.valueOf(days));
            totalPrice = totalPrice.add(actualPrice);

            BookingDetail detail = new BookingDetail();
            detail.setBookingReservation(reservation);
            detail.setRoomInformation(room);
            detail.setStartDate(detailReq.getStartDate());
            detail.setEndDate(detailReq.getEndDate());
            detail.setActualPrice(actualPrice);
            details.add(detail);
        }

        reservation.setTotalPrice(totalPrice);
        reservation.setBookingDetails(details);

        return bookingReservationRepository.save(reservation);
    }

    @Override
    public List<BookingReservation> getAllBookings() {
        return bookingReservationRepository.findAll();
    }

    @Override
    public BookingReservation getBookingById(Integer id) {
        return bookingReservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<BookingReservation> getBookingsByCustomerId(Integer customerId) {
        return bookingReservationRepository.findByCustomer_CustomerId(customerId);
    }

    @Override
    @Transactional
    public BookingReservation updateBookingStatus(Integer id, Byte status) {
        BookingReservation reservation = getBookingById(id);
        reservation.setBookingStatus(status);
        return bookingReservationRepository.save(reservation);
    }
}
