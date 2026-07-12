package com.zenxone.backend.repository;

import com.zenxone.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByBookingId(Long bookingId);
    List<Payment> findByPaymentType(Payment.PaymentType paymentType);
    List<Payment> findByStatus(Payment.PaymentStatus status);
}