package sba301.fuminihotelsystem.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import sba301.fuminihotelsystem.dtos.booking.BookingRequest;
import sba301.fuminihotelsystem.dtos.booking.BookingResponse;
import sba301.fuminihotelsystem.entities.BookingReservation;
import sba301.fuminihotelsystem.entities.Customer;
import sba301.fuminihotelsystem.services.BookingReservationService;
import sba301.fuminihotelsystem.services.CustomerService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingReservationController {

    @Autowired
    private BookingReservationService bookingReservationService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private sba301.fuminihotelsystem.mapper.BookingMapper bookingMapper;

    // CUSTOMER: Create a new booking reservation with one or many rooms
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "Create booking reservation (Customer only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<BookingResponse> createBooking(Authentication authentication,
            @Valid @RequestBody BookingRequest request) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getSubject();
        Customer customer = customerService.getCustomerByEmail(email);
        BookingReservation booking = bookingReservationService.createBooking(customer.getCustomerId(), request);
        return new ResponseEntity<>(bookingMapper.toBookingResponse(booking), HttpStatus.CREATED);
    }

    // CUSTOMER: View own booking history
    @GetMapping("/my")
    @PreAuthorize("hasRole('CUSTOMER')")
    @Operation(summary = "View own booking history (Customer only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<BookingResponse>> getMyBookings(Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        String email = jwt.getSubject();
        Customer customer = customerService.getCustomerByEmail(email);
        List<BookingResponse> responses = bookingReservationService.getBookingsByCustomerId(customer.getCustomerId())
                .stream()
                .map(bookingMapper::toBookingResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // STAFF: Get all bookings
    @GetMapping
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Get all booking reservations (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> responses = bookingReservationService.getAllBookings().stream()
                .map(bookingMapper::toBookingResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // STAFF: Get booking by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Get booking by ID (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Integer id) {
        BookingReservation booking = bookingReservationService.getBookingById(id);
        return new ResponseEntity<>(bookingMapper.toBookingResponse(booking), HttpStatus.OK);
    }

    // STAFF: Update booking status
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Update booking status (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<BookingResponse> updateBookingStatus(@PathVariable Integer id,
            @RequestParam Byte status) {
        BookingReservation booking = bookingReservationService.updateBookingStatus(id, status);
        return new ResponseEntity<>(bookingMapper.toBookingResponse(booking), HttpStatus.OK);
    }
}
