package com.zenxone.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalProperties;
    private long totalStudents;
    private long totalRooms;
    private long availableBeds;
    private long occupiedBeds;
    private BigDecimal totalRevenue;
    private long todaysEnquiries;
    private long todaysVisits;
    private long pendingFollowups;
}