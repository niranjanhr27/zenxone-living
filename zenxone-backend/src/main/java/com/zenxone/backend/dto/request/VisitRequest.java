package com.zenxone.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class VisitRequest {

    @NotNull(message = "Lead ID is required")
    private Long leadId;

    private Long executiveId;

    @NotNull(message = "Visit date is required")
    private LocalDate visitDate;

    private LocalTime visitTime;

    private String remarks;
}