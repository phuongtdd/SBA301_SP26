package sba301.a2trandinhduyphuong_se18d04.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewsArticleResponse {

    private Long newsArticleId;
    private String newsTitle;
    private String headline;
    private LocalDateTime createdDate;
    private String newsContent;
    private String newsSource;
    private Long categoryId;
    private String categoryName;
    private Boolean isActive;
    private Long createdById;
    private String createdByName;
    private LocalDateTime modifiedDate;
    private List<TagResponse> tags;

}
