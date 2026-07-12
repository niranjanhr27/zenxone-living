package com.zenxone.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id", nullable = false)
	private Booking booking;

	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal amount;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentType paymentType;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentMethod paymentMethod;

	@Column(unique = true)
	private String transactionId;

	@Enumerated(EnumType.STRING)
	@Builder.Default
	private PaymentStatus status = PaymentStatus.SUCCESS;

	private String receiptUrl;

	@Column(updatable = false)
	private LocalDateTime createdAt;

	@PrePersist
	protected void onCreate() {
		createdAt = LocalDateTime.now();
	}

	public enum PaymentType {
		ADVANCE, MONTHLY_RENT, SECURITY_DEPOSIT, PENALTY
	}

	public enum PaymentMethod {
		UPI, CASH, BANK_TRANSFER
	}

	public enum PaymentStatus {
		SUCCESS, PENDING, FAILED, REFUNDED
	}
}