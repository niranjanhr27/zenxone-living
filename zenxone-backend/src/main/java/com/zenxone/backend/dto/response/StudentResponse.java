package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Student;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {
    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private String college;
    private String course;
    private String parentName;
    private String parentPhone;
    private String emergencyContact;
    private String aadhaarNumber;
    private String aadhaarFileUrl;
    private String photoFileUrl;
    private Long bedId;
    private String bedNumber;
    private String roomNumber;
    private String propertyName;
    private LocalDate moveInDate;
    private LocalDate moveOutDate;
    private Student.StudentStatus status;
}