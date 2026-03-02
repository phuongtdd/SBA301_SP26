package sba301.fuminihotelsystem.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int code;
    private String message;
    private T result;

    public static <T> ApiResponse<T> error(String message, int code) {
        return ApiResponse.<T>builder()
                .code(code)
                .message(message)
                .build();
    }
}
