package com.MountainMirage.Hotel_Mountain_Mirage.Repo;

import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByBookingConfirmationCode(String confirmationCode);

}
