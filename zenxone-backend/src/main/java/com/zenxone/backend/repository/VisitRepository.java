package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByVisitDate(LocalDate visitDate);
    List<Visit> findByLeadId(Long leadId);
    List<Visit> findByExecutiveId(Long executiveId);
}