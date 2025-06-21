package com.MountainMirage.Hotel_Mountain_Mirage.Utils;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.BookingDTO;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.RoomDTO;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.UserDTO;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Booking;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Room;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMONPQRSTUVWXYZ0123456789";

    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for(int i = 0; i <length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        return userDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getDescription());
        return roomDTO;
    }

    public  static BookingDTO mapBookingEntityBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(bookingDTO.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTOPlusBooking(Room room) {
        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomPhotoUrl(room.getRoomPhotoUrl());
        roomDTO.setRoomDescription(room.getDescription());

        if (room.getBookings() != null) {
            roomDTO.setBookings(room.getBookings()
                    .stream()
                    .map(Utils::mapBookingEntityBookingDTO)
                    .collect(Collectors.toList()));
        }
        return roomDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(bookingDTO.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());

        if (mapUser){
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }

        if (booking.getRoom() != null) {
            RoomDTO roomDTO = new RoomDTO();
            roomDTO.setId(booking.getRoom().getId());
            roomDTO.setRoomType(booking.getRoom().getRoomType());
            roomDTO.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDTO.setRoomPhotoUrl(booking.getRoom().getRoomPhotoUrl());
            roomDTO.setRoomDescription(booking.getRoom().getDescription());
            bookingDTO.setRoom(roomDTO);
        }
        return bookingDTO;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingAndRoom(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(
                    user.getBookings()
                            .stream()
                            .map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false))
                            .collect(Collectors.toList())
            );

        }
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }


    public static List<RoomDTO> mapRoomListEntityToUserListDTO(List<Room> RoomList) {
        return RoomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToUserListDTO(List<Booking> BookingList) {
        return BookingList.stream().map(Utils::mapBookingEntityBookingDTO).collect(Collectors.toList());
    }
}
