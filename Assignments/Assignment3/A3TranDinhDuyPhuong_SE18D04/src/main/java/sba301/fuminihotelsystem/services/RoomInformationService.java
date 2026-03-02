package sba301.fuminihotelsystem.services;

import sba301.fuminihotelsystem.entities.RoomInformation;

import java.util.List;

public interface RoomInformationService {
    List<RoomInformation> getAllRooms();
    RoomInformation getRoomById(Integer id);
    RoomInformation saveRoom(RoomInformation roomInformation);
    void deleteRoom(Integer roomId);
}