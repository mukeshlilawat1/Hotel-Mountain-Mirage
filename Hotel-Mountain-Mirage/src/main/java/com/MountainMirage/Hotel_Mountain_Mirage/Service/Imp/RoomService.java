package com.MountainMirage.Hotel_Mountain_Mirage.Service.Imp;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.BookingRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.RoomRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.AWSS3Service;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
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
        return null;
    }

    @Override
    public List<String> getAllRoomTypes() {
        return List.of();
    }

    @Override
    public Response getAllRooms() {
        return null;
    }

    @Override
    public Response deleteRoom(Long roomId) {
        return null;
    }

    @Override
    public Response updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo) {
        return null;
    }

    @Override
    public Response getRoomById(Long roomId) {
        return null;
    }

    @Override
    public Response getAvailableRoomsByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return null;
    }

    @Override
    public Response getAllAvailableRooms() {
        return null;
    }
}
