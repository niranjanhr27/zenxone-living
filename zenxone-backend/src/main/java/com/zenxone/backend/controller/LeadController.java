package com.zenxone.backend.controller;

import com.zenxone.backend.dto.request.LeadRequest;
import com.zenxone.backend.dto.request.LeadStatusUpdateRequest;
import com.zenxone.backend.dto.response.ApiResponse;
import com.zenxone.backend.dto.response.LeadResponse;
import com.zenxone.backend.entity.Lead;
import com.zenxone.backend.service.LeadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leads")
@RequiredArgsConstructor
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<LeadResponse>>> getAllLeads() {
        return ResponseEntity.ok(ApiResponse.success("Leads fetched successfully", leadService.getAllLeads()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LeadResponse>> getLeadById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Lead fetched successfully", leadService.getLeadById(id)));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<LeadResponse>>> getLeadsByStatus(@PathVariable Lead.LeadStatus status) {
        return ResponseEntity.ok(ApiResponse.success("Leads fetched successfully", leadService.getLeadsByStatus(status)));
    }

    @GetMapping("/executive/{executiveId}")
    public ResponseEntity<ApiResponse<List<LeadResponse>>> getLeadsByExecutive(@PathVariable Long executiveId) {
        return ResponseEntity.ok(ApiResponse.success("Leads fetched successfully", leadService.getLeadsByExecutive(executiveId)));
    }

    // Public endpoint — website contact/enquiry form submits here without auth
    @PostMapping("/public")
    public ResponseEntity<ApiResponse<LeadResponse>> createPublicLead(@Valid @RequestBody LeadRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Enquiry submitted successfully", leadService.createLead(request)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LeadResponse>> createLead(@Valid @RequestBody LeadRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Lead created successfully", leadService.createLead(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LeadResponse>> updateLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Lead updated successfully", leadService.updateLead(id, request)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<LeadResponse>> updateLeadStatus(
            @PathVariable Long id,
            @Valid @RequestBody LeadStatusUpdateRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Lead status updated successfully", leadService.updateLeadStatus(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.ok(ApiResponse.success("Lead deleted successfully", null));
    }
}