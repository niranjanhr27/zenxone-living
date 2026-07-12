package com.zenxone.backend.controller;

import com.zenxone.backend.dto.request.BookingRequest;
import com.zenxone.backend.dto.response.ApiResponse;
import com.zenxone.backend.dto.response.BookingResponse;
import com.zenxone.backend.entity.Booking;
import com.zenxone.backend.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings() {
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully", bookingService.getAllBookings()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Booking fetched successfully", bookingService.getBookingById(id)));
    }

    @GetMapping("/booking-id/{bookingId}")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingByBookingId(@PathVariable String bookingId) {
        return ResponseEntity.ok(ApiResponse.success("Booking fetched successfully", bookingService.getBookingByBookingId(bookingId)));
    }

    // Public endpoint — Book Now wizard on website submits here without auth
    @PostMapping("/public")
    public ResponseEntity<ApiResponse<BookingResponse>> createPublicBooking(@Valid @RequestBody BookingRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Booking confirmed successfully", bookingService.createBooking(request)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(@Valid @RequestBody BookingRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Booking created successfully", bookingService.createBooking(request)));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<BookingResponse>> updateBookingStatus(
            @PathVariable Long id,
            @RequestParam Booking.BookingStatus status
    ) {
        return ResponseEntity.ok(ApiResponse.success("Booking status updated successfully", bookingService.updateBookingStatus(id, status)));
    }
}