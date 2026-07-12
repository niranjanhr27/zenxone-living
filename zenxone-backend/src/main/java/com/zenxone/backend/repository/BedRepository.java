package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BedRepository extends JpaRepository<Bed, Long> {
    List<Bed> findByRoomId(Long roomId);
    List<Bed> findByStatus(Bed.BedStatus status);
    long countByRoomIdAndStatus(Long roomId, Bed.BedStatus status);
}