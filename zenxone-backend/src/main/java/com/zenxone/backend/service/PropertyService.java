package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.PropertyRequest;
import com.zenxone.backend.dto.response.PropertyResponse;
import com.zenxone.backend.entity.Property;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public List<PropertyResponse> getAllProperties() {
        return propertyRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<PropertyResponse> getActiveProperties() {
        return propertyRepository.findByIsActiveTrue().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PropertyResponse getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        return mapToResponse(property);
    }

    public List<PropertyResponse> getPropertiesByType(Property.PropertyType type) {
        return propertyRepository.findByType(type).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public PropertyResponse createProperty(PropertyRequest request) {
        Property property = Property.builder()
                .name(request.getName())
                .type(request.getType())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .description(request.getDescription())
                .isActive(true)
                .build();

        Property saved = propertyRepository.save(property);
        return mapToResponse(saved);
    }

    @Transactional
    public PropertyResponse updateProperty(Long id, PropertyRequest request) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));

        property.setName(request.getName());
        property.setType(request.getType());
        property.setAddress(request.getAddress());
        property.setCity(request.getCity());
        property.setState(request.getState());
        property.setPincode(request.getPincode());
        property.setDescription(request.getDescription());

        Property updated = propertyRepository.save(property);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteProperty(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
        property.setIsActive(false);
        propertyRepository.save(property);
    }

    private PropertyResponse mapToResponse(Property property) {
        return PropertyResponse.builder()
                .id(property.getId())
                .name(property.getName())
                .type(property.getType())
                .address(property.getAddress())
                .city(property.getCity())
                .state(property.getState())
                .pincode(property.getPincode())
                .description(property.getDescription())
                .isActive(property.getIsActive())
                .totalRooms(property.getRooms() != null ? property.getRooms().size() : 0)
                .build();
    }
}