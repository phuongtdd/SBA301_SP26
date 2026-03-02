package sba301.fuminihotelsystem.dtos.room;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomTypeDto {
    private Integer roomTypeId;
    private String roomTypeName;
    private String typeDescription;
    private String typeNote;
}
