package com.zenxone.backend.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookingRequest {

    @NotNull(message = "Student details are required")
    private StudentRequest student;

    @NotNull(message = "Property ID is required")
    private Long propertyId;

    @NotNull(message = "Room ID is required")
    private Long roomId;

    @NotNull(message = "Bed ID is required")
    private Long bedId;

    @NotNull(message = "Monthly rent is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal monthlyRent;

    @NotNull(message = "Advance payment is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal advancePayment;

    private BigDecimal securityDeposit;

    @NotNull(message = "Payment method is required")
    private String paymentMethod;
}