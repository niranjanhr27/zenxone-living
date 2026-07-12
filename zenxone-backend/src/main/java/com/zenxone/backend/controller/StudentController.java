package com.zenxone.backend.controller;

import com.zenxone.backend.dto.request.StudentRequest;
import com.zenxone.backend.dto.response.ApiResponse;
import com.zenxone.backend.dto.response.StudentResponse;
import com.zenxone.backend.entity.Student;
import com.zenxone.backend.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getAllStudents() {
        return ResponseEntity.ok(ApiResponse.success("Students fetched successfully", studentService.getAllStudents()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponse>> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Student fetched successfully", studentService.getStudentById(id)));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<StudentResponse>>> getStudentsByStatus(@PathVariable Student.StudentStatus status) {
        return ResponseEntity.ok(ApiResponse.success("Students fetched successfully", studentService.getStudentsByStatus(status)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentResponse>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Student updated successfully", studentService.updateStudent(id, request)));
    }

    @PatchMapping("/{id}/documents")
    public ResponseEntity<ApiResponse<Void>> updateDocuments(
            @PathVariable Long id,
            @RequestParam(required = false) String aadhaarFileUrl,
            @RequestParam(required = false) String photoFileUrl
    ) {
        studentService.updateDocuments(id, aadhaarFileUrl, photoFileUrl);
        return ResponseEntity.ok(ApiResponse.success("Documents updated successfully", null));
    }

    @PatchMapping("/{id}/move-out")
    public ResponseEntity<ApiResponse<Void>> moveOutStudent(@PathVariable Long id) {
        studentService.moveOutStudent(id);
        return ResponseEntity.ok(ApiResponse.success("Student moved out successfully", null));
    }
}