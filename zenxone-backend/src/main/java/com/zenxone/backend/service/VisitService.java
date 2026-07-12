package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.VisitRequest;
import com.zenxone.backend.dto.response.VisitResponse;
import com.zenxone.backend.entity.Lead;
import com.zenxone.backend.entity.User;
import com.zenxone.backend.entity.Visit;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.LeadRepository;
import com.zenxone.backend.repository.UserRepository;
import com.zenxone.backend.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VisitService {

    private final VisitRepository visitRepository;
    private final LeadRepository leadRepository;
    private final UserRepository userRepository;

    public List<VisitResponse> getAllVisits() {
        return visitRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public VisitResponse getVisitById(Long id) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit not found with id: " + id));
        return mapToResponse(visit);
    }

    public List<VisitResponse> getTodaysVisits() {
        return visitRepository.findByVisitDate(LocalDate.now()).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<VisitResponse> getVisitsByLead(Long leadId) {
        return visitRepository.findByLeadId(leadId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<VisitResponse> getVisitsByExecutive(Long executiveId) {
        return visitRepository.findByExecutiveId(executiveId).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public VisitResponse createVisit(VisitRequest request) {
        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + request.getLeadId()));

        Visit.VisitBuilder builder = Visit.builder()
                .lead(lead)
                .visitDate(request.getVisitDate())
                .visitTime(request.getVisitTime())
                .remarks(request.getRemarks())
                .status(Visit.VisitStatus.SCHEDULED);

        if (request.getExecutiveId() != null) {
            User executive = userRepository.findById(request.getExecutiveId())
                    .orElseThrow(() -> new ResourceNotFoundException("Executive not found with id: " + request.getExecutiveId()));
            builder.executive(executive);
        }

        Visit saved = visitRepository.save(builder.build());

        // Update lead status to VISIT_SCHEDULED
        lead.setStatus(Lead.LeadStatus.VISIT_SCHEDULED);
        leadRepository.save(lead);

        return mapToResponse(saved);
    }

    @Transactional
    public VisitResponse updateVisitStatus(Long id, Visit.VisitStatus status, String remarks) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit not found with id: " + id));

        visit.setStatus(status);
        if (remarks != null) {
            visit.setRemarks(remarks);
        }

        Visit updated = visitRepository.save(visit);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteVisit(Long id) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit not found with id: " + id));
        visitRepository.delete(visit);
    }
    
    @Transactional
    public VisitResponse updateVisit(Long id, VisitRequest request) {
        Visit visit = visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit not found with id: " + id));

        visit.setVisitDate(request.getVisitDate());
        visit.setVisitTime(request.getVisitTime());
        visit.setRemarks(request.getRemarks());

        if (request.getExecutiveId() != null) {
            User executive = userRepository.findById(request.getExecutiveId())
                    .orElseThrow(() -> new ResourceNotFoundException("Executive not found with id: " + request.getExecutiveId()));
            visit.setExecutive(executive);
        }

        Visit updated = visitRepository.save(visit);
        return mapToResponse(updated);
    }

    private VisitResponse mapToResponse(Visit visit) {
        return VisitResponse.builder()
                .id(visit.getId())
                .leadId(visit.getLead().getId())
                .leadName(visit.getLead().getLeadName())
                .leadPhone(visit.getLead().getPhone())
                .executiveId(visit.getExecutive() != null ? visit.getExecutive().getId() : null)
                .executiveName(visit.getExecutive() != null ? visit.getExecutive().getFullName() : null)
                .visitDate(visit.getVisitDate())
                .visitTime(visit.getVisitTime())
                .remarks(visit.getRemarks())
                .status(visit.getStatus())
                .build();
    }
}