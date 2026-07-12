package com.zenxone.backend.dto.request;

import com.zenxone.backend.entity.Property;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PropertyRequest {

    @NotBlank(message = "Property name is required")
    private String name;

    @NotNull(message = "Property type is required")
    private Property.PropertyType type;

    private String address;
    private String city;
    private String state;
    private String pincode;
    private String description;
}