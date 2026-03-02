package sba301.fuminihotelsystem.services;

import sba301.fuminihotelsystem.dtos.room_type.RoomTypeRequest;
import sba301.fuminihotelsystem.dtos.room_type.RoomTypeResponse;

import java.util.List;

public interface RoomTypeService {
    RoomTypeResponse addRoomType(RoomTypeRequest roomTypeRequest);
    RoomTypeResponse getRoomTypeById(Integer roomTypeId);
    RoomTypeResponse updateRoomType(Integer roomTypeId, RoomTypeRequest roomTypeRequest);
    RoomTypeResponse deleteRoomType(Integer roomTypeId);
    List<RoomTypeResponse> getAllRoomTypes();
}
