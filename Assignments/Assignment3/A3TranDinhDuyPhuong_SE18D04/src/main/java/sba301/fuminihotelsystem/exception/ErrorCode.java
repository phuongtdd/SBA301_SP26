package sba301.fuminihotelsystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public enum ErrorCode {
    UNCAUGHT_EXCEPTION(9999, "Uncaught exception", HttpStatus.INTERNAL_SERVER_ERROR),
    CUSTOMER_ALREADY_EXISTS(1002, "Customer already exists", HttpStatus.BAD_REQUEST),
    CUSTOMER_NOT_FOUND(1003, "Customer not found", HttpStatus.NOT_FOUND),
    EMAIL_NOT_FOUND(1004, "Email address not found", HttpStatus.NOT_FOUND),
    INVALID_INPUT(1005, "Invalid input data", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED(1009, "User is not authenticated", HttpStatus.UNAUTHORIZED),
    ACCESS_DENIED(1014, "Bạn không có quyền truy cập tài nguyên này", HttpStatus.FORBIDDEN),
    ROOM_NOT_AVAILABLE(1021, "Room is not available for the selected dates", HttpStatus.BAD_REQUEST),
    BOOKING_NOT_FOUND(1022, "Booking not found", HttpStatus.NOT_FOUND),
    ROOM_NOT_FOUND(1023, "Room not found", HttpStatus.NOT_FOUND),
    ROOM_TYPE_NOT_FOUND(1024, "Room type not found", HttpStatus.NOT_FOUND),
    TOKEN_GENERATION_FAILED(1025, "Cannot generate token", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_CREDENTIALS(1026, "Invalid email or password", HttpStatus.UNAUTHORIZED),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatusCode getStatusCode() {
        return statusCode;
    }
}
