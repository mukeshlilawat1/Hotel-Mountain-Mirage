package com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Booking;

public interface IBookingService  {
 Response saveBooking(Long rootId, Long userId, Booking bookingRequest);
      Response findBookingByConfirmationCode(String confirmationCode);
      Response getAllBookings();
      Response cancelBooking();
}
