package com.zenxone.backend.dto.response;

import com.zenxone.backend.entity.Booking;
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
public class BookingResponse {
    private Long id;
    private String bookingId;
    private Long studentId;
    private String studentName;
    private String propertyName;
    private String roomNumber;
    private String bedNumber;
    private BigDecimal monthlyRent;
    private BigDecimal advancePayment;
    private BigDecimal securityDeposit;
    private Booking.BookingStatus status;
    private LocalDateTime createdAt;
}