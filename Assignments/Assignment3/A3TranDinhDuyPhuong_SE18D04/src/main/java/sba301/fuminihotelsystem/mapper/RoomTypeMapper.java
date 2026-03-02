package sba301.fuminihotelsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import sba301.fuminihotelsystem.dtos.room_type.RoomTypeRequest;
import sba301.fuminihotelsystem.dtos.room_type.RoomTypeResponse;
import sba301.fuminihotelsystem.entities.RoomType;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface RoomTypeMapper {
    RoomType toRoomType(RoomTypeRequest request);

    void updateRoomType(@MappingTarget RoomType roomType, RoomTypeRequest request);

    RoomTypeResponse toRoomTypeResponse(RoomType roomType);

    sba301.fuminihotelsystem.dtos.room.RoomTypeDto toRoomTypeDto(RoomType roomType);
}
