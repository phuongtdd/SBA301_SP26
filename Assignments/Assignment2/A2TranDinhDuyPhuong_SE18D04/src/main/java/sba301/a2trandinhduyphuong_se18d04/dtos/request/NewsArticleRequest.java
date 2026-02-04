package sba301.a2trandinhduyphuong_se18d04.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsArticleRequest {

    @NotBlank(message = "News title is required")
    @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
    private String newsTitle;

    @Size(max = 300, message = "Headline must not exceed 300 characters")
    private String headline;

    @NotBlank(message = "News content is required")
    private String newsContent;

    @Size(max = 255, message = "News source must not exceed 255 characters")
    private String newsSource;

    @NotNull(message = "Category is required")
    private Long categoryId;

    @NotNull(message = "Status is required")
    private Boolean isActive;

    private List<Long> tagIds;

}
