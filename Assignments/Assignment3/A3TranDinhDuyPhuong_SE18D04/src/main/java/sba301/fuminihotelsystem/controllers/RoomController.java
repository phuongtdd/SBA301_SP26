package sba301.fuminihotelsystem.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sba301.fuminihotelsystem.dtos.room.RoomRequest;
import sba301.fuminihotelsystem.dtos.room.RoomResponse;
import sba301.fuminihotelsystem.entities.RoomInformation;
import sba301.fuminihotelsystem.entities.RoomType;
import sba301.fuminihotelsystem.repositories.RoomTypeRepository;
import sba301.fuminihotelsystem.services.RoomInformationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    @Autowired
    private RoomInformationService roomService;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private sba301.fuminihotelsystem.mapper.RoomMapper roomMapper;

    // PUBLIC: View all rooms (no authentication needed)
    @GetMapping
    @Operation(summary = "Get all rooms (Public)")
    public ResponseEntity<List<RoomResponse>> getAllRooms() {
        List<RoomResponse> responses = roomService.getAllRooms().stream()
                .map(roomMapper::toRoomResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    // PUBLIC: View room detail
    @GetMapping("/{id}")
    @Operation(summary = "Get room by ID (Public)")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Integer id) {
        RoomInformation room = roomService.getRoomById(id);
        return new ResponseEntity<>(roomMapper.toRoomResponse(room), HttpStatus.OK);
    }

    // STAFF: Create room
    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Create new room (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<RoomResponse> createRoom(@Valid @RequestBody RoomRequest roomRequest) {
        RoomType roomType = roomTypeRepository.findById(roomRequest.getRoomTypeId())
                .orElseThrow(() -> new RuntimeException("Room type not found"));

        RoomInformation roomParam = roomMapper.toRoomInformation(roomRequest, roomType);
        RoomInformation savedRoom = roomService.saveRoom(roomParam);
        return new ResponseEntity<>(roomMapper.toRoomResponse(savedRoom), HttpStatus.CREATED);
    }

    // STAFF: Update room
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Update room (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Integer id,
            @Valid @RequestBody RoomRequest roomRequest) {

        RoomInformation existingRoom = roomService.getRoomById(id);
        RoomType roomType = roomTypeRepository.findById(roomRequest.getRoomTypeId())
                .orElseThrow(() -> new RuntimeException("Room type not found"));

        RoomInformation roomParam = roomMapper.updateRoomInformation(existingRoom, roomRequest, roomType);
        RoomInformation updatedRoom = roomService.saveRoom(roomParam);
        return new ResponseEntity<>(roomMapper.toRoomResponse(updatedRoom), HttpStatus.OK);
    }

    // STAFF: Delete room (hard delete if no booking, soft delete otherwise)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STAFF')")
    @Operation(summary = "Delete room - soft/hard delete (Staff only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<String> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return new ResponseEntity<>("Deleted or changed status successfully", HttpStatus.OK);
    }
}
