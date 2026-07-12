package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByType(Property.PropertyType type);
    List<Property> findByIsActiveTrue();
}