package sba301.fuminihotelsystem.dtos.room_type;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomTypeRequest {
    private String roomTypeName;
    private String typeDescription;
    private String typeNote;
}
