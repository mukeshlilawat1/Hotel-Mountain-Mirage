package com.MountainMirage.Hotel_Mountain_Mirage.Repo;

import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    // Fetch distinct room types
    @Query("SELECT DISTINCT R.roomType FROM Room R")
    List<String> findDistinctRoomTypes();

    // Fix: use correct entity alias in FROM clause (Room R)
    @Query("SELECT R FROM Room R WHERE R.id NOT IN (SELECT b.room.id FROM Booking b)")
    List<Room> getAllAvailableRoom();

    @Query("select r from Room r where r.roomType like %:roomType% And r.id not in (select bk.room.id from Booking bk where)" +
    "(bk.checkInDate <= : checkOutDate) and (bk.checkOutDate >= : checkInDate)")
    List<Room> findAvailableRoomByDateAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String roomType);


}
