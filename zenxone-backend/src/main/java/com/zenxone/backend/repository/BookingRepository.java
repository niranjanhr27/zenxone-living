package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingId(String bookingId);
    List<Booking> findByStudentId(Long studentId);
    List<Booking> findByStatus(Booking.BookingStatus status);
    List<Booking> findByPropertyId(Long propertyId);
}