package com.zenxone.backend.service;

import com.zenxone.backend.dto.response.DashboardStatsResponse;
import com.zenxone.backend.entity.Bed;
import com.zenxone.backend.entity.Lead;
import com.zenxone.backend.entity.Payment;
import com.zenxone.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final PropertyRepository propertyRepository;
    private final StudentRepository studentRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final PaymentRepository paymentRepository;
    private final LeadRepository leadRepository;
    private final VisitRepository visitRepository;

    public DashboardStatsResponse getStats() {
        long totalProperties = propertyRepository.count();
        long totalStudents = studentRepository.count();
        long totalRooms = roomRepository.count();
        long availableBeds = bedRepository.findByStatus(Bed.BedStatus.AVAILABLE).size();
        long occupiedBeds = bedRepository.findByStatus(Bed.BedStatus.OCCUPIED).size();

        BigDecimal totalRevenue = paymentRepository.findAll().stream()
                .filter(p -> p.getStatus() == Payment.PaymentStatus.SUCCESS)
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long todaysEnquiries = leadRepository.findAll().stream()
                .filter(l -> l.getCreatedAt().toLocalDate().isEqual(LocalDate.now()))
                .count();

        long todaysVisits = visitRepository.findByVisitDate(LocalDate.now()).size();

        long pendingFollowups = leadRepository.findByStatus(Lead.LeadStatus.INTERESTED).size()
                + leadRepository.findByStatus(Lead.LeadStatus.NEW).size();

        return DashboardStatsResponse.builder()
                .totalProperties(totalProperties)
                .totalStudents(totalStudents)
                .totalRooms(totalRooms)
                .availableBeds(availableBeds)
                .occupiedBeds(occupiedBeds)
                .totalRevenue(totalRevenue)
                .todaysEnquiries(todaysEnquiries)
                .todaysVisits(todaysVisits)
                .pendingFollowups(pendingFollowups)
                .build();
    }
}