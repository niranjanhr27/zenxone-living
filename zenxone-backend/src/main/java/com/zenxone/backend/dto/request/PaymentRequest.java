package com.zenxone.backend.dto.request;

import com.zenxone.backend.entity.Payment;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal amount;

    @NotNull(message = "Payment type is required")
    private Payment.PaymentType paymentType;

    @NotNull(message = "Payment method is required")
    private Payment.PaymentMethod paymentMethod;

    private String transactionId;
}