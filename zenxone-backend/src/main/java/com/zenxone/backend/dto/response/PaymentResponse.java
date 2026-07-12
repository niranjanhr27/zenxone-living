package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {
    private Long id;
    private Long bookingId;
    private String bookingReferenceId;
    private String studentName;
    private BigDecimal amount;
    private Payment.PaymentType paymentType;
    private Payment.PaymentMethod paymentMethod;
    private String transactionId;
    private Payment.PaymentStatus status;
    private LocalDateTime createdAt;
    
}