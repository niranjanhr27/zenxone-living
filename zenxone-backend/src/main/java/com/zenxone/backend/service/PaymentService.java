package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.PaymentRequest;
import com.zenxone.backend.dto.response.PaymentResponse;
import com.zenxone.backend.entity.Booking;
import com.zenxone.backend.entity.Payment;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.BookingRepository;
import com.zenxone.backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentService {

	private final PaymentRepository paymentRepository;
	private final BookingRepository bookingRepository;

	public List<PaymentResponse> getAllPayments() {
		return paymentRepository.findAll().stream().map(this::mapToResponse).toList();
	}

	public List<PaymentResponse> getPaymentsByBooking(Long bookingId) {
		return paymentRepository.findByBookingId(bookingId).stream().map(this::mapToResponse).toList();
	}

	@Transactional
	public PaymentResponse recordPayment(PaymentRequest request) {
		Booking booking = bookingRepository.findById(request.getBookingId()).orElseThrow(
				() -> new ResourceNotFoundException("Booking not found with id: " + request.getBookingId()));

		Payment payment = Payment.builder().booking(booking).amount(request.getAmount())
				.paymentType(request.getPaymentType()).paymentMethod(request.getPaymentMethod())
				.transactionId(request.getTransactionId()).status(Payment.PaymentStatus.SUCCESS).build();

		Payment saved = paymentRepository.save(payment);
		return mapToResponse(saved);

	}

	@Transactional
	public PaymentResponse updatePayment(Long id, PaymentRequest request) {
		Payment payment = paymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));

		payment.setAmount(request.getAmount());
		payment.setPaymentType(request.getPaymentType());
		payment.setPaymentMethod(request.getPaymentMethod());
		payment.setTransactionId(request.getTransactionId());

		Payment updated = paymentRepository.save(payment);
		return mapToResponse(updated);
	}

	@Transactional
	public void deletePayment(Long id) {
		Payment payment = paymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
		paymentRepository.delete(payment);
	}

	private PaymentResponse mapToResponse(Payment payment) {
		return PaymentResponse.builder().id(payment.getId()).bookingId(payment.getBooking().getId())
				.bookingReferenceId(payment.getBooking().getBookingId())
				.studentName(payment.getBooking().getStudent().getFullName()).amount(payment.getAmount())
				.paymentType(payment.getPaymentType()).paymentMethod(payment.getPaymentMethod())
				.transactionId(payment.getTransactionId()).status(payment.getStatus()).createdAt(payment.getCreatedAt())
				.build();
	}
}