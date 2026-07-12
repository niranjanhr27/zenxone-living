package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.StudentRequest;
import com.zenxone.backend.dto.response.StudentResponse;
import com.zenxone.backend.entity.Student;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentService {

    private final StudentRepository studentRepository;

    public List<StudentResponse> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public StudentResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return mapToResponse(student);
    }

    public List<StudentResponse> getStudentsByStatus(Student.StudentStatus status) {
        return studentRepository.findByStatus(status).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        student.setFullName(request.getFullName());
        student.setPhone(request.getPhone());
        student.setEmail(request.getEmail());
        student.setCollege(request.getCollege());
        student.setCourse(request.getCourse());
        student.setParentName(request.getParentName());
        student.setParentPhone(request.getParentPhone());
        student.setEmergencyContact(request.getEmergencyContact());
        student.setAadhaarNumber(request.getAadhaarNumber());

        Student updated = studentRepository.save(student);
        return mapToResponse(updated);
    }

    @Transactional
    public void updateDocuments(Long id, String aadhaarFileUrl, String photoFileUrl) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        if (aadhaarFileUrl != null) student.setAadhaarFileUrl(aadhaarFileUrl);
        if (photoFileUrl != null) student.setPhotoFileUrl(photoFileUrl);

        studentRepository.save(student);
    }

    @Transactional
    public void moveOutStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        student.setStatus(Student.StudentStatus.MOVED_OUT);
        student.setMoveOutDate(java.time.LocalDate.now());

        if (student.getBed() != null) {
            student.getBed().setStatus(com.zenxone.backend.entity.Bed.BedStatus.AVAILABLE);
        }

        studentRepository.save(student);
    }

    StudentResponse mapToResponse(Student student) {
        return StudentResponse.builder()
                .id(student.getId())
                .fullName(student.getFullName())
                .phone(student.getPhone())
                .email(student.getEmail())
                .college(student.getCollege())
                .course(student.getCourse())
                .parentName(student.getParentName())
                .parentPhone(student.getParentPhone())
                .emergencyContact(student.getEmergencyContact())
                .aadhaarNumber(student.getAadhaarNumber())
                .aadhaarFileUrl(student.getAadhaarFileUrl())
                .photoFileUrl(student.getPhotoFileUrl())
                .bedId(student.getBed() != null ? student.getBed().getId() : null)
                .bedNumber(student.getBed() != null ? student.getBed().getBedNumber() : null)
                .roomNumber(student.getBed() != null ? student.getBed().getRoom().getRoomNumber() : null)
                .propertyName(student.getBed() != null ? student.getBed().getRoom().getProperty().getName() : null)
                .moveInDate(student.getMoveInDate())
                .moveOutDate(student.getMoveOutDate())
                .status(student.getStatus())
                .build();
    }
}