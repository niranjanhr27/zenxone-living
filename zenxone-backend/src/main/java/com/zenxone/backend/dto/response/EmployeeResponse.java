package com.zenxone.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String username;
    private String email;
    private String phone;
    private String role;
    private String designation;
    private BigDecimal salary;
    private LocalDate joiningDate;
    private Boolean isActive;
}