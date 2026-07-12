package com.zenxone.backend.dto.request;

import com.zenxone.backend.entity.Lead;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LeadStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private Lead.LeadStatus status;

    private String remarks;
}