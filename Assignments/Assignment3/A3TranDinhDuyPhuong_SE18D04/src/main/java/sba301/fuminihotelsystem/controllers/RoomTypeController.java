package sba301.fuminihotelsystem.controllers;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import sba301.fuminihotelsystem.common.ApiResponse;
import sba301.fuminihotelsystem.dtos.room_type.RoomTypeRequest;
import sba301.fuminihotelsystem.dtos.room_type.RoomTypeResponse;
import sba301.fuminihotelsystem.services.RoomTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/roomtypes")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class RoomTypeController {

    RoomTypeService roomTypeService;

    @PostMapping
    @Operation(summary = "Create new room type (Staff only)")
    public ApiResponse<RoomTypeResponse> createRoomType(@RequestBody RoomTypeRequest request) {
        return ApiResponse.created(roomTypeService.addRoomType(request));
    }

    @GetMapping
    @Operation(summary = "Get all room types (Public)")
    public ApiResponse<List<RoomTypeResponse>> getAllRoomTypes() {
        return ApiResponse.created(roomTypeService.getAllRoomTypes());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get room type by ID (Public)")
    public ApiResponse<RoomTypeResponse> getRoomTypeById(@RequestParam Integer id) {
        return ApiResponse.created(roomTypeService.getRoomTypeById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update room type by ID (Staff only)")
    public ApiResponse<RoomTypeResponse> updateRoomType(@RequestParam Integer id,
            @RequestBody RoomTypeRequest request) {
        return ApiResponse.created(roomTypeService.updateRoomType(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete room type by ID (Staff only)")
    public ApiResponse<RoomTypeResponse> deleteRoomType(@RequestParam Integer id) {
        return ApiResponse.deleted(roomTypeService.deleteRoomType(id));
    }

}
