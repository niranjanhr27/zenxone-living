package com.zenxone.backend.dto.request;

import com.zenxone.backend.entity.Lead;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class LeadRequest {

    @NotBlank(message = "Lead name is required")
    private String leadName;

    private String parentName;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String email;
    private String college;
    private String course;
    private BigDecimal budget;
    private Long propertyId;
    private Lead.LeadSource leadSource;
    private Long executiveId;
    private String remarks;
}