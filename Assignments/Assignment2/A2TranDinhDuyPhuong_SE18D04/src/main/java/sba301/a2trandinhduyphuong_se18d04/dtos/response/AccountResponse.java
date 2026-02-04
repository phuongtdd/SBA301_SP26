package sba301.a2trandinhduyphuong_se18d04.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {

    private Long accountId;
    private String accountName;
    private String accountEmail;
    private Integer accountRole;
    private String roleName;

}
