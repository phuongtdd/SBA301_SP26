package sba301.a2trandinhduyphuong_se18d04.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {

    private Long categoryId;
    private String categoryName;
    private String categoryDescription;
    private Long parentCategoryId;
    private Boolean isActive;

}
