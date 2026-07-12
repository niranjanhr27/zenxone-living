package com.zenxone.backend.controller;

import com.zenxone.backend.dto.request.PropertyRequest;
import com.zenxone.backend.dto.response.ApiResponse;
import com.zenxone.backend.dto.response.PropertyResponse;
import com.zenxone.backend.entity.Property;
import com.zenxone.backend.service.PropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PropertyResponse>>> getAllProperties() {
        List<PropertyResponse> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(ApiResponse.success("Properties fetched successfully", properties));
    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<PropertyResponse>>> getActiveProperties() {
        List<PropertyResponse> properties = propertyService.getActiveProperties();
        return ResponseEntity.ok(ApiResponse.success("Active properties fetched successfully", properties));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PropertyResponse>> getPropertyById(@PathVariable Long id) {
        PropertyResponse property = propertyService.getPropertyById(id);
        return ResponseEntity.ok(ApiResponse.success("Property fetched successfully", property));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<ApiResponse<List<PropertyResponse>>> getPropertiesByType(@PathVariable Property.PropertyType type) {
        List<PropertyResponse> properties = propertyService.getPropertiesByType(type);
        return ResponseEntity.ok(ApiResponse.success("Properties fetched successfully", properties));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(@Valid @RequestBody PropertyRequest request) {
        PropertyResponse property = propertyService.createProperty(request);
        return ResponseEntity.ok(ApiResponse.success("Property created successfully", property));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PropertyResponse>> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequest request
    ) {
        PropertyResponse property = propertyService.updateProperty(id, request);
        return ResponseEntity.ok(ApiResponse.success("Property updated successfully", property));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok(ApiResponse.success("Property deleted successfully", null));
    }
}