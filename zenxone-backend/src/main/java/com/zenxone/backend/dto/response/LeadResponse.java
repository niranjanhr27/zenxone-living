package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Lead;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadResponse {
    private Long id;
    private String leadName;
    private String parentName;
    private String phone;
    private String email;
    private String college;
    private String course;
    private BigDecimal budget;
    private Long propertyId;
    private String propertyName;
    private Lead.LeadSource leadSource;
    private Long executiveId;
    private String executiveName;
    private Lead.LeadStatus status;
    private String remarks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}