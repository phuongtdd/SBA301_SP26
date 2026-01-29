package sba301.lab4_new_orchid.models.orchid;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrchidAddRequest {

    private String orchidName;

    private Boolean isNatural;

    private String orchidDescription;

    private Boolean isAttractive;

    private String orchidURL;

    private Double price;

    private OrchidCategory orchidCategory;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrchidCategory{
        private Integer id;
    }
}

