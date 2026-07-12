package com.zenxone.backend.controller;

import com.zenxone.backend.dto.request.VisitRequest;
import com.zenxone.backend.dto.response.ApiResponse;
import com.zenxone.backend.dto.response.VisitResponse;
import com.zenxone.backend.entity.Visit;
import com.zenxone.backend.service.VisitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/visits")
@RequiredArgsConstructor
public class VisitController {

	private final VisitService visitService;

	@GetMapping
	public ResponseEntity<ApiResponse<List<VisitResponse>>> getAllVisits() {
		return ResponseEntity.ok(ApiResponse.success("Visits fetched successfully", visitService.getAllVisits()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<VisitResponse>> getVisitById(@PathVariable Long id) {
		return ResponseEntity.ok(ApiResponse.success("Visit fetched successfully", visitService.getVisitById(id)));
	}

	@GetMapping("/today")
	public ResponseEntity<ApiResponse<List<VisitResponse>>> getTodaysVisits() {
		return ResponseEntity
				.ok(ApiResponse.success("Today's visits fetched successfully", visitService.getTodaysVisits()));
	}

	@GetMapping("/lead/{leadId}")
	public ResponseEntity<ApiResponse<List<VisitResponse>>> getVisitsByLead(@PathVariable Long leadId) {
		return ResponseEntity
				.ok(ApiResponse.success("Visits fetched successfully", visitService.getVisitsByLead(leadId)));
	}

	@GetMapping("/executive/{executiveId}")
	public ResponseEntity<ApiResponse<List<VisitResponse>>> getVisitsByExecutive(@PathVariable Long executiveId) {
		return ResponseEntity
				.ok(ApiResponse.success("Visits fetched successfully", visitService.getVisitsByExecutive(executiveId)));
	}

	// Public endpoint — website "Schedule Visit" button submits here without auth
	@PostMapping("/public")
	public ResponseEntity<ApiResponse<VisitResponse>> createPublicVisit(@Valid @RequestBody VisitRequest request) {
		return ResponseEntity
				.ok(ApiResponse.success("Visit scheduled successfully", visitService.createVisit(request)));
	}

	@PostMapping
	public ResponseEntity<ApiResponse<VisitResponse>> createVisit(@Valid @RequestBody VisitRequest request) {
		return ResponseEntity.ok(ApiResponse.success("Visit created successfully", visitService.createVisit(request)));
	}

	@PatchMapping("/{id}/status")
	public ResponseEntity<ApiResponse<VisitResponse>> updateVisitStatus(@PathVariable Long id,
			@RequestParam Visit.VisitStatus status, @RequestParam(required = false) String remarks) {
		return ResponseEntity.ok(ApiResponse.success("Visit status updated successfully",
				visitService.updateVisitStatus(id, status, remarks)));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<Void>> deleteVisit(@PathVariable Long id) {
		visitService.deleteVisit(id);
		return ResponseEntity.ok(ApiResponse.success("Visit deleted successfully", null));
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<VisitResponse>> updateVisit(@PathVariable Long id,
			@Valid @RequestBody VisitRequest request) {
		return ResponseEntity
				.ok(ApiResponse.success("Visit updated successfully", visitService.updateVisit(id, request)));
	}
}