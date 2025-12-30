package com.Mountain_Mirage_Hotel.service.impl;

import com.Mountain_Mirage_Hotel.dto.Response;
import com.Mountain_Mirage_Hotel.dto.RoomDTO;
import com.Mountain_Mirage_Hotel.entity.Room;
import com.Mountain_Mirage_Hotel.exception.OurException;
import com.Mountain_Mirage_Hotel.repository.BookingRepository;
import com.Mountain_Mirage_Hotel.repository.RoomRepository;
import com.Mountain_Mirage_Hotel.service.AwsS3Service;
import com.Mountain_Mirage_Hotel.service.interfac.IRoomService;
import com.Mountain_Mirage_Hotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class RoomService implements IRoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public Response addRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description) {
        Response response = new Response();

        try {
            String imageUrl = awsS3Service.saveImageToS3(photo);
            Room room = new Room();

            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setRoomDescription(description);

            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);

            response.setRoom(roomDTO);
            response.setMessage("Room Added");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room info" + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getALlRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
            List<RoomDTO> roomDTOSList = Utils.mapRoomListEntityToRoomListDTO(roomList);

            response.setMessage("Successfully retrieved all rooms");
            response.setStatusCode(200);
            response.setRoomList(roomDTOSList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all rooms " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();

        try {
           roomRepository.findById(roomId).orElseThrow(() -> new OurException("Roon Not Found"));
           roomRepository.deleteById(roomId);

            response.setMessage("Room Delete Successfully");
            response.setStatusCode(200);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Deleting a rooms " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo) {
        Response response = new Response();

        try {
           String ImageUrl =null;
           if (photo != null && !photo.isEmpty()) {
               ImageUrl = awsS3Service.saveImageToS3(photo);
           }
           Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));

           if (roomType != null) {
              room.setRoomType(roomType);
           }
           if (roomPrice != null) {
               room.setRoomPrice(roomPrice);
           }
           if (description != null) {
               room.setRoomDescription(description);
           }
           if (ImageUrl != null) {
               room.setRoomPhotoUrl(ImageUrl);
           }

           Room updatedRoom = roomRepository.save(room);
           RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);
            response.setMessage("Room Updated");
            response.setStatusCode(200);
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Deleting a rooms " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();

        try {
            Room room =  roomRepository.findById(roomId).orElseThrow(() -> new OurException("Roon Not Found"));
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTOPlusBookings(room);

            response.setMessage("Successfully");
            response.setStatusCode(200);
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting a rooms BY Id" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();

        try {
            List<Room> availableRooms = roomRepository.findAvailableRoomByDateAndTypes(checkInDate, checkOutDate, roomType);
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availableRooms);

            response.setMessage("Available Rooms");
            response.setStatusCode(200);
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting available rooms " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.getAllAvailableRooms();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);

            response.setMessage("Successfully");
            response.setStatusCode(200);
            response.setRoomList(roomDTOList);
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting available rooms " + e.getMessage());
        }
        return response;
    }
}
