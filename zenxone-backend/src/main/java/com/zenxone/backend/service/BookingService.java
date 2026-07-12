package com.zenxone.backend.service;

import com.zenxone.backend.dto.request.BookingRequest;
import com.zenxone.backend.dto.response.BookingResponse;
import com.zenxone.backend.entity.*;
import com.zenxone.backend.exception.ResourceNotFoundException;
import com.zenxone.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookingService {

    private final BookingRepository bookingRepository;
    private final StudentRepository studentRepository;
    private final PropertyRepository propertyRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final PaymentRepository paymentRepository;

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return mapToResponse(booking);
    }

    public BookingResponse getBookingByBookingId(String bookingId) {
        Booking booking = bookingRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with bookingId: " + bookingId));
        return mapToResponse(booking);
    }

    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        Bed bed = bedRepository.findById(request.getBedId())
                .orElseThrow(() -> new ResourceNotFoundException("Bed not found"));

        if (bed.getStatus() != Bed.BedStatus.AVAILABLE) {
            throw new IllegalStateException("Selected bed is not available");
        }

        // 1. Create Student
        Student student = Student.builder()
                .fullName(request.getStudent().getFullName())
                .phone(request.getStudent().getPhone())
                .email(request.getStudent().getEmail())
                .college(request.getStudent().getCollege())
                .course(request.getStudent().getCourse())
                .parentName(request.getStudent().getParentName())
                .parentPhone(request.getStudent().getParentPhone())
                .emergencyContact(request.getStudent().getEmergencyContact())
                .aadhaarNumber(request.getStudent().getAadhaarNumber())
                .bed(bed)
                .moveInDate(LocalDate.now())
                .status(Student.StudentStatus.ACTIVE)
                .build();

        Student savedStudent = studentRepository.save(student);

        // 2. Mark bed as occupied
        bed.setStatus(Bed.BedStatus.OCCUPIED);
        bedRepository.save(bed);

        // 3. Create Booking
        String generatedBookingId = "ZX" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Booking booking = Booking.builder()
                .bookingId(generatedBookingId)
                .student(savedStudent)
                .property(property)
                .room(room)
                .bed(bed)
                .monthlyRent(request.getMonthlyRent())
                .advancePayment(request.getAdvancePayment())
                .securityDeposit(request.getSecurityDeposit())
                .status(Booking.BookingStatus.CONFIRMED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        // 4. Record advance Payment
        Payment payment = Payment.builder()
                .booking(savedBooking)
                .amount(request.getAdvancePayment())
                .paymentType(Payment.PaymentType.ADVANCE)
                .paymentMethod(Payment.PaymentMethod.valueOf(request.getPaymentMethod().toUpperCase()))
                .status(Payment.PaymentStatus.SUCCESS)
                .build();

        paymentRepository.save(payment);

        return mapToResponse(savedBooking);
    }

    @Transactional
    public BookingResponse updateBookingStatus(Long id, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);
        return mapToResponse(updated);
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .bookingId(booking.getBookingId())
                .studentId(booking.getStudent().getId())
                .studentName(booking.getStudent().getFullName())
                .propertyName(booking.getProperty().getName())
                .roomNumber(booking.getRoom().getRoomNumber())
                .bedNumber(booking.getBed().getBedNumber())
                .monthlyRent(booking.getMonthlyRent())
                .advancePayment(booking.getAdvancePayment())
                .securityDeposit(booking.getSecurityDeposit())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}