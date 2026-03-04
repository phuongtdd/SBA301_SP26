package sba301.pe_sba301_sp25_be_de180212.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PageResponse<T> {
    List<T> content;
    int page;
    int size;
    Long totalElements;
    int totalPages;
    boolean first;
    boolean last;
    boolean empty;
}
