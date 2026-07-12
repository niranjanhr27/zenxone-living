package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.LeadRequest;
import com.zenxone.backend.dto.request.LeadStatusUpdateRequest;
import com.zenxone.backend.dto.response.LeadResponse;
import com.zenxone.backend.entity.Lead;
import com.zenxone.backend.entity.Property;
import com.zenxone.backend.entity.User;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.LeadRepository;
import com.zenxone.backend.repository.PropertyRepository;
import com.zenxone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LeadService {

    private final LeadRepository leadRepository;
    private final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    public List<LeadResponse> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public LeadResponse getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));
        return mapToResponse(lead);
    }

    public List<LeadResponse> getLeadsByStatus(Lead.LeadStatus status) {
        return leadRepository.findByStatus(status).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<LeadResponse> getLeadsByExecutive(Long executiveId) {
        return leadRepository.findByExecutiveId(executiveId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public LeadResponse createLead(LeadRequest request) {
        Lead.LeadBuilder builder = Lead.builder()
                .leadName(request.getLeadName())
                .parentName(request.getParentName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .college(request.getCollege())
                .course(request.getCourse())
                .budget(request.getBudget())
                .leadSource(request.getLeadSource() != null ? request.getLeadSource() : Lead.LeadSource.WEBSITE)
                .status(Lead.LeadStatus.NEW)
                .remarks(request.getRemarks());

        if (request.getPropertyId() != null) {
            Property property = propertyRepository.findById(request.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + request.getPropertyId()));
            builder.property(property);
        }

        if (request.getExecutiveId() != null) {
            User executive = userRepository.findById(request.getExecutiveId())
                    .orElseThrow(() -> new ResourceNotFoundException("Executive not found with id: " + request.getExecutiveId()));
            builder.executive(executive);
        }

        Lead saved = leadRepository.save(builder.build());
        return mapToResponse(saved);
    }

    @Transactional
    public LeadResponse updateLead(Long id, LeadRequest request) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));

        lead.setLeadName(request.getLeadName());
        lead.setParentName(request.getParentName());
        lead.setPhone(request.getPhone());
        lead.setEmail(request.getEmail());
        lead.setCollege(request.getCollege());
        lead.setCourse(request.getCourse());
        lead.setBudget(request.getBudget());
        lead.setRemarks(request.getRemarks());

        if (request.getLeadSource() != null) {
            lead.setLeadSource(request.getLeadSource());
        }

        if (request.getPropertyId() != null) {
            Property property = propertyRepository.findById(request.getPropertyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + request.getPropertyId()));
            lead.setProperty(property);
        }

        if (request.getExecutiveId() != null) {
            User executive = userRepository.findById(request.getExecutiveId())
                    .orElseThrow(() -> new ResourceNotFoundException("Executive not found with id: " + request.getExecutiveId()));
            lead.setExecutive(executive);
        }

        Lead updated = leadRepository.save(lead);
        return mapToResponse(updated);
    }

    @Transactional
    public LeadResponse updateLeadStatus(Long id, LeadStatusUpdateRequest request) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));

        lead.setStatus(request.getStatus());
        if (request.getRemarks() != null) {
            lead.setRemarks(request.getRemarks());
        }

        Lead updated = leadRepository.save(lead);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteLead(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));
        leadRepository.delete(lead);
    }

    private LeadResponse mapToResponse(Lead lead) {
        return LeadResponse.builder()
                .id(lead.getId())
                .leadName(lead.getLeadName())
                .parentName(lead.getParentName())
                .phone(lead.getPhone())
                .email(lead.getEmail())
                .college(lead.getCollege())
                .course(lead.getCourse())
                .budget(lead.getBudget())
                .propertyId(lead.getProperty() != null ? lead.getProperty().getId() : null)
                .propertyName(lead.getProperty() != null ? lead.getProperty().getName() : null)
                .leadSource(lead.getLeadSource())
                .executiveId(lead.getExecutive() != null ? lead.getExecutive().getId() : null)
                .executiveName(lead.getExecutive() != null ? lead.getExecutive().getFullName() : null)
                .status(lead.getStatus())
                .remarks(lead.getRemarks())
                .createdAt(lead.getCreatedAt())
                .updatedAt(lead.getUpdatedAt())
                .build();
    }
}