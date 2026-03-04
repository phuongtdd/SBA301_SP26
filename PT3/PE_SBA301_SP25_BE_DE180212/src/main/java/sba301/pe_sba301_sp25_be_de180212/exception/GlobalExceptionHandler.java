package sba301.pe_sba301_sp25_be_de180212.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import sba301.pe_sba301_sp25_be_de180212.common.ApiResponse;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ApiResponse<?>> handleValidationExceptions(MethodArgumentNotValidException ex) {
                Map<String, String> errors = new HashMap<>();
                ex.getBindingResult().getFieldErrors()
                                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
                log.warn("Validation failed: {}", errors);
                return ResponseEntity.badRequest()
                                .body(ApiResponse.error("Validation failed: " + errors,
                                                HttpStatus.BAD_REQUEST.value()));
        }

        @ExceptionHandler(AuthorizationDeniedException.class)
        public ResponseEntity<ApiResponse<?>> handleAuthorizationDeniedException(
                        AuthorizationDeniedException e) {
                log.warn("Authorization denied: {}", e.getMessage());
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(ApiResponse.error(
                                                "Bạn không có quyền truy cập tài nguyên này",
                                                ErrorCode.ACCESS_DENIED.getCode()));
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ApiResponse<?>> handleAccessDeniedException(
                        AccessDeniedException e) {
                log.warn("Access denied: {}", e.getMessage());
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(ApiResponse.error(
                                                "Bạn không có quyền truy cập tài nguyên này",
                                                ErrorCode.ACCESS_DENIED.getCode()));
        }

        @ExceptionHandler(AuthenticationException.class)
        public ResponseEntity<ApiResponse<?>> handleAuthenticationException(
                        AuthenticationException e) {
                log.warn("Authentication failed: {}", e.getMessage());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(ApiResponse.error(
                                                "Vui lòng đăng nhập",
                                                ErrorCode.UNAUTHORIZED.getCode()));
        }

        @ExceptionHandler(value = AppException.class)
        ResponseEntity<ApiResponse<?>> handlingAppException(AppException exception) {
                ErrorCode errorCode = exception.getErrorCode();
                return ResponseEntity.status(errorCode.getStatusCode())
                                .body(ApiResponse.error(errorCode.getMessage(), errorCode.getCode()));
        }

        @ExceptionHandler(value = Exception.class)
        ResponseEntity<ApiResponse<?>> handlingRuntimeException(Exception exception) {
                log.error("Unhandled exception: ", exception);
                ErrorCode errorCode = ErrorCode.UNCAUGHT_EXCEPTION;
                return ResponseEntity.status(errorCode.getStatusCode())
                                .body(ApiResponse.error(exception.getMessage(), errorCode.getCode()));
        }
}
