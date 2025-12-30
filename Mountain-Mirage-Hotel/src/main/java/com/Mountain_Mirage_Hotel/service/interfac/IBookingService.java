package com.Mountain_Mirage_Hotel.service.interfac;

import com.Mountain_Mirage_Hotel.dto.Response;
import com.Mountain_Mirage_Hotel.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
