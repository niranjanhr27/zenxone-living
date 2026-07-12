package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByPhone(String phone);
    List<Student> findByStatus(Student.StudentStatus status);
    List<Student> findByBedId(Long bedId);
}