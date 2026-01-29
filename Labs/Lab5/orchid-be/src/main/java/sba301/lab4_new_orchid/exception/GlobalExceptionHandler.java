package sba301.lab4_new_orchid.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<Void>> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        log.warn("AppException: {}", errorCode.getMessage());

        HttpStatus status = getHttpStatus(errorCode);

        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();

        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Map<String, String>>> handlingValidationException(
            MethodArgumentNotValidException exception) {
        log.warn("Validation error: {}", exception.getMessage());

        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        ApiResponse<Map<String, String>> response = ApiResponse.<Map<String, String>>builder()
                .code(ErrorCode.INVALID_REQUEST.getCode())
                .message("Validation failed")
                .data(errors)
                .build();

        return ResponseEntity.badRequest().body(response);
    }

    // Handle IllegalArgumentException (400 Bad Request)
    @ExceptionHandler(value = IllegalArgumentException.class)
    ResponseEntity<ApiResponse<Void>> handlingIllegalArgumentException(IllegalArgumentException exception) {
        log.warn("IllegalArgumentException: {}", exception.getMessage());

        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .code(ErrorCode.INVALID_REQUEST.getCode())
                .message(exception.getMessage())
                .build();

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<Void>> handlingRuntimeException(Exception exception) {
        log.error("UNCAUGHT EXCEPTION: {}", exception.getMessage(), exception);

        ApiResponse<Void> response = ApiResponse.<Void>builder()
                .code(ErrorCode.UNCAUGHT_EXCEPTION.getCode())
                .message(ErrorCode.UNCAUGHT_EXCEPTION.getMessage())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private HttpStatus getHttpStatus(ErrorCode errorCode) {
        return switch (errorCode) {
            case ORCHID_NOT_FOUND, CATEGORY_NOT_FOUND, USER_NOT_EXISTED,
                    ROOM_NOT_EXISTED, SUBJECT_NOT_EXISTED, EXAM_NOT_EXISTED,
                    QUESTION_NOT_EXISTED, ANSWER_NOT_EXISTED, SUBMISSION_NOT_EXISTED,
                    PERMISSION_NOT_EXISTED, ROLE_NOT_EXISTED, FLASHCARD_NOT_EXISTED,
                    CARD_SET_NOT_EXIST, KNOWLEDGE_BASE_NOT_EXIST ->
                HttpStatus.NOT_FOUND;
            case INVALID_REQUEST -> HttpStatus.BAD_REQUEST;
            case USER_UNAUTHICATED -> HttpStatus.UNAUTHORIZED;
            default -> HttpStatus.BAD_REQUEST;
        };
    }
}
