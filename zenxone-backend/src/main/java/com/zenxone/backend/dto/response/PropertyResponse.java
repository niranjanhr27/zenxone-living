package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Property;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyResponse {
    private Long id;
    private String name;
    private Property.PropertyType type;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String description;
    private Boolean isActive;
    private Integer totalRooms;
}