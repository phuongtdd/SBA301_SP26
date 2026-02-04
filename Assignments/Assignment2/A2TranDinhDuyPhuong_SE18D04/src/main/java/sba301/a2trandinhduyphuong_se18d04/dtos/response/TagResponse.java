package sba301.a2trandinhduyphuong_se18d04.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagResponse {

    private Long tagId;
    private String tagName;
    private String note;

}
