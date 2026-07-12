package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.RoomRequest;
import com.zenxone.backend.dto.response.BedResponse;
import com.zenxone.backend.dto.response.RoomResponse;
import com.zenxone.backend.entity.Bed;
import com.zenxone.backend.entity.Property;
import com.zenxone.backend.entity.Room;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.BedRepository;
import com.zenxone.backend.repository.PropertyRepository;
import com.zenxone.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {

    private final RoomRepository roomRepository;
    private final PropertyRepository propertyRepository;
    private final BedRepository bedRepository;

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<RoomResponse> getRoomsByProperty(Long propertyId) {
        return roomRepository.findByPropertyId(propertyId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public RoomResponse getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        return mapToResponse(room);
    }

    @Transactional
    public RoomResponse createRoom(RoomRequest request) {
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + request.getPropertyId()));

        Room room = Room.builder()
                .property(property)
                .roomNumber(request.getRoomNumber())
                .roomType(request.getRoomType())
                .totalBeds(request.getTotalBeds())
                .pricePerBed(request.getPricePerBed())
                .maintenanceStatus(Room.MaintenanceStatus.GOOD)
                .build();

        Room savedRoom = roomRepository.save(room);

        // Auto-generate beds based on totalBeds
        List<Bed> beds = new ArrayList<>();
        for (int i = 1; i <= request.getTotalBeds(); i++) {
            Bed bed = Bed.builder()
                    .room(savedRoom)
                    .bedNumber("Bed " + i)
                    .status(Bed.BedStatus.AVAILABLE)
                    .build();
            beds.add(bed);
        }
        bedRepository.saveAll(beds);
        savedRoom.setBeds(beds);

        return mapToResponse(savedRoom);
    }

    @Transactional
    public RoomResponse updateRoom(Long id, RoomRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));

        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + request.getPropertyId()));

        room.setProperty(property);
        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(request.getRoomType());
        room.setTotalBeds(request.getTotalBeds());
        room.setPricePerBed(request.getPricePerBed());

        Room updated = roomRepository.save(room);
        return mapToResponse(updated);
    }

    @Transactional
    public void updateMaintenanceStatus(Long id, Room.MaintenanceStatus status) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        room.setMaintenanceStatus(status);
        roomRepository.save(room);
    }

    @Transactional
    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        roomRepository.delete(room);
    }

    private RoomResponse mapToResponse(Room room) {
        long availableCount = room.getBeds() != null
                ? room.getBeds().stream().filter(b -> b.getStatus() == Bed.BedStatus.AVAILABLE).count()
                : 0;

        List<BedResponse> bedResponses = room.getBeds() != null
                ? room.getBeds().stream().map(this::mapBedToResponse).toList()
                : List.of();

        return RoomResponse.builder()
                .id(room.getId())
                .propertyId(room.getProperty().getId())
                .propertyName(room.getProperty().getName())
                .roomNumber(room.getRoomNumber())
                .roomType(room.getRoomType())
                .totalBeds(room.getTotalBeds())
                .pricePerBed(room.getPricePerBed())
                .maintenanceStatus(room.getMaintenanceStatus())
                .availableBeds((int) availableCount)
                .beds(bedResponses)
                .build();
    }

    private BedResponse mapBedToResponse(Bed bed) {
        return BedResponse.builder()
                .id(bed.getId())
                .roomId(bed.getRoom().getId())
                .bedNumber(bed.getBedNumber())
                .status(bed.getStatus())
                .build();
    }
}