package com.zenxone.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String email;
    private String college;
    private String course;
    private String parentName;
    private String parentPhone;
    private String emergencyContact;
    private String aadhaarNumber;
}