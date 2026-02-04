package sba301.a2trandinhduyphuong_se18d04.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagRequest {

    @NotBlank(message = "Tag name is required")
    @Size(min = 2, max = 100, message = "Tag name must be between 2 and 100 characters")
    private String tagName;

    @Size(max = 500, message = "Note must not exceed 500 characters")
    private String note;

}
