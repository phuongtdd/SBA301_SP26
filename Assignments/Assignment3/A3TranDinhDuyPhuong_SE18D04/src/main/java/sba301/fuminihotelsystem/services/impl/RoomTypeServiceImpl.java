package sba301.fuminihotelsystem.services.impl;

import sba301.fuminihotelsystem.exception.AppException;
import sba301.fuminihotelsystem.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import sba301.fuminihotelsystem.dtos.room_type.RoomTypeRequest;
import sba301.fuminihotelsystem.dtos.room_type.RoomTypeResponse;
import sba301.fuminihotelsystem.entities.RoomType;
import sba301.fuminihotelsystem.mapper.RoomTypeMapper;
import sba301.fuminihotelsystem.repositories.RoomTypeRepository;
import sba301.fuminihotelsystem.services.RoomTypeService;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomTypeServiceImpl implements RoomTypeService {

    RoomTypeRepository roomTypeRepository;
    RoomTypeMapper roomTypeMapper;

    @Override
    public RoomTypeResponse addRoomType(RoomTypeRequest roomTypeRequest) {
        RoomType roomType = roomTypeMapper.toRoomType(roomTypeRequest);
        return roomTypeMapper.toRoomTypeResponse(roomTypeRepository.save(roomType));
    }

    @Override
    public RoomTypeResponse getRoomTypeById(Integer roomTypeId) {
        return roomTypeRepository.findById(roomTypeId)
                .map(roomTypeMapper::toRoomTypeResponse)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));
    }

    @Override
    public RoomTypeResponse updateRoomType(Integer roomTypeId, RoomTypeRequest roomTypeRequest) {
        RoomType existingRoomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        roomTypeMapper.updateRoomType(existingRoomType, roomTypeRequest);

        return roomTypeMapper.toRoomTypeResponse(roomTypeRepository.save(existingRoomType));
    }

    @Override
    public RoomTypeResponse deleteRoomType(Integer roomTypeId) {
        RoomType deletedRoomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        roomTypeRepository.deleteById(roomTypeId);
        return roomTypeMapper.toRoomTypeResponse(deletedRoomType);
    }

    @Override
    public List<RoomTypeResponse> getAllRoomTypes() {
        return roomTypeRepository.findAll().stream()
                .map(roomTypeMapper::toRoomTypeResponse)
                .toList();
    }
}
