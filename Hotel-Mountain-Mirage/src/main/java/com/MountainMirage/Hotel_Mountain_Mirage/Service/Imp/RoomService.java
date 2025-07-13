package com.MountainMirage.Hotel_Mountain_Mirage.Service.Imp;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.RoomDTO;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Room;
import com.MountainMirage.Hotel_Mountain_Mirage.Exception.OurException;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.BookingRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.RoomRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.AWSS3Service;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac.IRoomService;
import com.MountainMirage.Hotel_Mountain_Mirage.Utils.Utils;
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
    private AWSS3Service awss3Service;

    @Override
    public Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description) {
        Response response = new Response();

        try {
            String imageUrl = awss3Service.saveImageToS3(photo);
            Room room = new Room();
            room.setRoomPhotoUrl(imageUrl);
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);
            room.setDescription(description);

            Room savedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);

            response.setRoom(roomDTO);
            response.setMessage("Room Added Successfully");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting a User Info " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public Response getAllRooms() {
        Response response = new Response();

        try {
            List<Room> roomList = roomRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToUserListDTO(roomList);

            response.setMessage("Successfully");
            response.setStatusCode(200);
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all rooms" + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        Response response = new Response();

        try {
            roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            roomRepository.deleteById(roomId);
            response.setMessage("Successfully");
            response.setStatusCode(200);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Deleting a Room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice,
                               MultipartFile photo) {
        Response response = new Response();

        try {
            String imageUrl = null;

            if (photo != null && !photo.isEmpty()) {
                imageUrl = awss3Service.saveImageToS3(photo);
            }

            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            if (roomType != null) {
                room.setRoomType(roomType);
            }
            if (roomPrice != null) {
                room.setRoomPrice(roomPrice);
            }
            if (description != null) {
                room.setDescription(description);
            }

            if (room != null) {
                room.setRoomPhotoUrl(imageUrl);
            }

            Room updatedRoom = roomRepository.save(room);
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);

            response.setMessage(("Room Updated Successfully"));
            response.setStatusCode(200);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Updating a Room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(Long roomId) {
        Response response = new Response();

        try {
            //check if the room exists or not
            Room room = roomRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
               //map the room entity to room DTO with booking details
            RoomDTO roomDTO = Utils.mapRoomEntityToRoomDTOPlusBooking(room);


            response.setMessage("Successfully");
            response.setStatusCode(200);
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting a Room By Id : " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
       Response response = new Response();

       try {
           List<Room> availableRooms = roomRepository.findAvailableRoomByDateAndTypes(checkInDate, checkOutDate,roomType);
           List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToUserListDTO(availableRooms);

           response.setMessage("successfully");
           response.setStatusCode(200);
           response.setRoomList(roomDTOList);
       }catch (OurException e) {
           response.setStatusCode(404);
           response.setMessage(e.getMessage());
       } catch (Exception e) {
           response.setStatusCode(500);
           response.setMessage("Error Getting Available Rooms By Date And Type:" + e.getMessage());
       }
       return  response;
    }

    @Override
    public Response getAllAvailableRooms() {
        Response response = new Response();

        try {

            List<Room> availableRooms = roomRepository.getAllAvailableRoom();
            List<RoomDTO> roomDTOList = Utils.mapRoomListEntityToUserListDTO(availableRooms);

            response.setMessage("Successfully");
            response.setStatusCode(200);
            response.setRoomList(roomDTOList);
        }catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting Available Rooms " + e.getMessage());
        }
        return response;
    }
}
