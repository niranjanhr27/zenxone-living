package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private Long id;
    private Long propertyId;
    private String propertyName;
    private String roomNumber;
    private String roomType;
    private Integer totalBeds;
    private BigDecimal pricePerBed;
    private Room.MaintenanceStatus maintenanceStatus;
    private Integer availableBeds;
    private List<BedResponse> beds;
}