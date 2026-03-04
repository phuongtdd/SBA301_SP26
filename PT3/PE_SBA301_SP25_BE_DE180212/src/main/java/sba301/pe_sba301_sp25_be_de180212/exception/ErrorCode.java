package sba301.pe_sba301_sp25_be_de180212.exception;

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
