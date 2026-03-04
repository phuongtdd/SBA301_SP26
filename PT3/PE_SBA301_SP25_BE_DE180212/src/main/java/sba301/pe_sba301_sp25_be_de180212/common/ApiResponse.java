package sba301.pe_sba301_sp25_be_de180212.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.lang.reflect.Array;
import java.util.Collection;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    @NotNull
    private boolean success;
    private int code = 1000;
    private String message;
    @NotNull
    private T data;
    @NotNull
    private Long total;

    //Success có data
    public static <T> ApiResponse<T> ok(T data) {
        long size = 1L;
        if(data != null && data.getClass().isArray()) {
            size = Array.getLength(data);
        } else if(data instanceof Collection) {
            size = ((Collection<?>)data).size();
        }

        return ApiResponse.<T>builder()
                .success(true)
                .code(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .data(data)
                .total(size)
                .build();
    }

    //Success không có data
    public static <T> ApiResponse<T> ok() {
        return ApiResponse.<T>builder()
                .success(true)
                .code(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .total(1L)
                .build();
    }

    //Success có phân trang
    public static <T> ApiResponse<PageResponse<T>> ok(Page<T> data) {
        PageResponse<T> pageResponse = PageResponse.<T>builder()
                .content(data.getContent())
                .page(data.getNumber())
                .size(data.getSize())
                .totalElements(data.getTotalElements())
                .totalPages(data.getTotalPages())
                .first(data.isFirst())
                .last(data.isLast())
                .empty(data.isEmpty())
                .build();

        return ApiResponse.<PageResponse<T>>builder()
                .success(true)
                .code(HttpStatus.OK.value())
                .message(HttpStatus.OK.getReasonPhrase())
                .data(pageResponse)
                .total(data.getTotalElements())
                .build();
    }

    //Tạo thành công 1 record
    public static <T> ApiResponse<T> created(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .code(HttpStatus.CREATED.value())
                .message(HttpStatus.CREATED.getReasonPhrase())
                .data(data)
                .total(1L)
                .build();
    }

    //Xóa thành công 1 record
    public static <T> ApiResponse<T> deleted(T data){
        return ApiResponse.<T>builder()
                .success(true)
                .code(HttpStatus.NO_CONTENT.value())
                .message(HttpStatus.NO_CONTENT.getReasonPhrase())
                .data(data)
                .total(1L)
                .build();
    }

    //Not found
    public static <T> ApiResponse<T> notFound(){
        return ApiResponse.<T>builder()
                .success(false)
                .code(HttpStatus.NOT_FOUND.value())
                .message(HttpStatus.NOT_FOUND.getReasonPhrase())
                .total(0L)
                .build();
    }

    //Api khong hop le - bad request
    public static <T> ApiResponse<T> badRequest(){
        return ApiResponse.<T>builder()
                .success(false)
                .code(HttpStatus.BAD_REQUEST.value())
                .message(HttpStatus.BAD_REQUEST.getReasonPhrase())
                .total(0L)
                .build();
    }

    //bad request - custom response
    public static <T> ApiResponse<T> error(String message){
        return ApiResponse.<T>builder()
                .success(false)
                .code(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .total(0L)
                .build();
    }

    public static <T> ApiResponse<T> error(String message, int code){
        return ApiResponse.<T>builder()
                .success(false)
                .code(code)
                .message(message)
                .total(0L)
                .build();
    }
}