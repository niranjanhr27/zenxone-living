package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Visit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitResponse {
    private Long id;
    private Long leadId;
    private String leadName;
    private String leadPhone;
    private Long executiveId;
    private String executiveName;
    private LocalDate visitDate;
    private LocalTime visitTime;
    private String remarks;
    private Visit.VisitStatus status;
}