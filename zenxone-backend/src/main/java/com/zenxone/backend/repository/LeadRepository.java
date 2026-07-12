package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface LeadRepository extends JpaRepository<Lead, Long>, JpaSpecificationExecutor<Lead> {
    List<Lead> findByStatus(Lead.LeadStatus status);
    List<Lead> findByExecutiveId(Long executiveId);
    List<Lead> findByPhone(String phone);
}