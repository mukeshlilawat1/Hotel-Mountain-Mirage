package com.Mountain_Mirage_Hotel.repository;

import com.Mountain_Mirage_Hotel.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingConfirmationCode(String bookingConfirmationCode);

    Long id(Long id);
}
