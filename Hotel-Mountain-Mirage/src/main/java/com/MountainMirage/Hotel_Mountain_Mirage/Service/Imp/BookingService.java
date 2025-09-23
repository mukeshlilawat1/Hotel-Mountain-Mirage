package com.MountainMirage.Hotel_Mountain_Mirage.Service.Imp;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Booking;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Room;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;
import com.MountainMirage.Hotel_Mountain_Mirage.Exception.OurException;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.BookingRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.RoomRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.UserRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac.IBookingService;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac.IRoomService;
import com.MountainMirage.Hotel_Mountain_Mirage.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.yaml.snakeyaml.tokens.ScalarToken;

import java.util.List;

public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private IRoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    UserRepository repository;


    @Override
    public Response saveBooking(Long rootId, Long userId, Booking bookingRequest) {
        Response response = new Response();

        try {
            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
                throw new IllegalArgumentException("Check In data must be before Check Out");
            }
            Room room = roomRepository.findById(rootId).orElseThrow(() -> new OurException("Room Not Found"));
            User user = repository.findById(userId).orElseThrow(() -> new OurException("User Not Found"));

            List<Booking> existingBookings = room.getBookings();
            if (!roomIsAvailable(bookingRequest, existingBookings)) {
                throw new OurException("Room Not Available for the selected data range");
            }
            bookingRequest.setRoom(room);
            bookingRequest.setUser(user);
            String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
            bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);
            bookingRepository.save(bookingRequest);

            response.setStatusCode(200);
            response.setMessage("Booking Confirmed Successfully");
            response.setBookingConfirmation(bookingConfirmationCode);

            response.setMessage("Booking Successful");
            response.setStatusCode(200);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a booking" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response findBookingByConfirmationCode(String confirmationCode) {

    }

    @Override
    public Response getAllBookings() {
        return null;
    }

    @Override
    public Response cancelBooking() {
        return null;
    }

    private boolean roomIsAvailable(Booking bookingRequest, List<Booking> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existing ->
                        bookingRequest.getCheckInDate().isBefore(existing.getCheckOutDate()) &&
                                bookingRequest.getCheckOutDate().isAfter(existing.getCheckInDate())
                );
//        return existingBookings.stream().noneMatch(existingBooking ->
//                bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
//                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
//                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
//                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
//                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
//                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
//                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))
//                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
//                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
//                ||(bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
//                &&(bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate())))
//        );

    }
}
