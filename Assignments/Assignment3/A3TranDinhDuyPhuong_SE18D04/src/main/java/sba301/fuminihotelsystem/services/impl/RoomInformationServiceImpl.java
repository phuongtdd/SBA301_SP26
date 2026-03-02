package sba301.fuminihotelsystem.services.impl;

import sba301.fuminihotelsystem.exception.AppException;
import sba301.fuminihotelsystem.exception.ErrorCode;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sba301.fuminihotelsystem.entities.BookingDetail;
import sba301.fuminihotelsystem.entities.RoomInformation;
import sba301.fuminihotelsystem.repositories.BookingDetailRepository;
import sba301.fuminihotelsystem.repositories.RoomInformationRepository;
import sba301.fuminihotelsystem.services.RoomInformationService;

import java.util.List;

@Service
public class RoomInformationServiceImpl implements RoomInformationService {

    @Autowired
    private RoomInformationRepository roomRepository;

    @Autowired
    private BookingDetailRepository bookingDetailRepository;

    @Override
    public List<RoomInformation> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public RoomInformation getRoomById(Integer id) {
        return roomRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
    }

    @Override
    @Transactional
    public RoomInformation saveRoom(RoomInformation roomInformation) {
        return roomRepository.save(roomInformation);
    }

    @Override
    @Transactional
    public void deleteRoom(Integer roomId) {
        RoomInformation room = getRoomById(roomId);

        List<BookingDetail> bookingHistory = bookingDetailRepository.findByRoomInformation_RoomId(roomId);

        if (bookingHistory != null && !bookingHistory.isEmpty()) {
            room.setRoomStatus((byte) 0);
            roomRepository.save(room);
        } else {
            roomRepository.delete(room);
        }
    }
}