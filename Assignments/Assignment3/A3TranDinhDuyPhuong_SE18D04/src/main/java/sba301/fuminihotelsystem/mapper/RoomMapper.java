package sba301.fuminihotelsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;
import sba301.fuminihotelsystem.dtos.room.RoomRequest;
import sba301.fuminihotelsystem.dtos.room.RoomResponse;
import sba301.fuminihotelsystem.entities.RoomInformation;
import sba301.fuminihotelsystem.entities.RoomType;

@Mapper(componentModel = "spring", uses = {
        RoomTypeMapper.class }, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public interface RoomMapper {

    RoomResponse toRoomResponse(RoomInformation roomInfo);

    default RoomInformation toRoomInformation(RoomRequest request, RoomType roomType) {
        if (request == null) {
            return null;
        }
        RoomInformation roomInfo = new RoomInformation();
        roomInfo.setRoomNumber(request.getRoomNumber());
        roomInfo.setRoomDetailDescription(request.getRoomDetailDescription());
        roomInfo.setRoomMaxCapacity(request.getRoomMaxCapacity());
        roomInfo.setRoomStatus(request.getRoomStatus() != null ? request.getRoomStatus() : 1);
        roomInfo.setRoomPricePerDay(request.getRoomPricePerDay());
        roomInfo.setRoomType(roomType);
        return roomInfo;
    }

    default RoomInformation updateRoomInformation(RoomInformation existingRoom, RoomRequest request,
            RoomType roomType) {
        if (existingRoom == null || request == null) {
            return existingRoom;
        }
        existingRoom.setRoomNumber(request.getRoomNumber());
        existingRoom.setRoomDetailDescription(request.getRoomDetailDescription());
        existingRoom.setRoomMaxCapacity(request.getRoomMaxCapacity());
        if (request.getRoomStatus() != null) {
            existingRoom.setRoomStatus(request.getRoomStatus());
        }
        existingRoom.setRoomPricePerDay(request.getRoomPricePerDay());
        if (roomType != null) {
            existingRoom.setRoomType(roomType);
        }
        return existingRoom;
    }
}
