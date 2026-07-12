package com.zenxone.backend.controller;

import com.zenxone.backend.dto.request.RoomRequest;
import com.zenxone.backend.dto.response.ApiResponse;
import com.zenxone.backend.dto.response.RoomResponse;
import com.zenxone.backend.entity.Room;
import com.zenxone.backend.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getAllRooms() {
        return ResponseEntity.ok(ApiResponse.success("Rooms fetched successfully", roomService.getAllRooms()));
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getRoomsByProperty(@PathVariable Long propertyId) {
        return ResponseEntity.ok(ApiResponse.success("Rooms fetched successfully", roomService.getRoomsByProperty(propertyId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomResponse>> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Room fetched successfully", roomService.getRoomById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoomResponse>> createRoom(@Valid @RequestBody RoomRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Room created successfully", roomService.createRoom(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoomResponse>> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody RoomRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Room updated successfully", roomService.updateRoom(id, request)));
    }

    @PatchMapping("/{id}/maintenance")
    public ResponseEntity<ApiResponse<Void>> updateMaintenanceStatus(
            @PathVariable Long id,
            @RequestParam Room.MaintenanceStatus status
    ) {
        roomService.updateMaintenanceStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Maintenance status updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok(ApiResponse.success("Room deleted successfully", null));
    }
}