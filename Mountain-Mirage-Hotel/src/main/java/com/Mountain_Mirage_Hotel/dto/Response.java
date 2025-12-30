package com.Mountain_Mirage_Hotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int StatusCode;
    private String Message;

    private String token;
    private String role;
    private String expirationTime;
    private String bookingConfirmationCode;

    private UserDTO user;
    private RoomDTO room;
    private BookingDTO booking;

    private List<UserDTO> userDTOList;
    private List<RoomDTO> roomDTOList;
    private List<BookingDTO> bookingDTOList;
}
