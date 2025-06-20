package com.MountainMirage.Hotel_Mountain_Mirage.Repo;

import com.MountainMirage.Hotel_Mountain_Mirage.Entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    // Fetch distinct room types
    @Query("SELECT DISTINCT R.roomType FROM Room R")
    List<String> findDistinctRoomTypes();

    // Fix: use correct entity alias in FROM clause (Room R)
    @Query("SELECT R FROM Room R WHERE R.id NOT IN (SELECT b.room.id FROM Booking b)")
    List<Room> getAllAvailableRoom();

    @Query("SELECT r FROM Room r WHERE r.roomType LIKE %:roomType% AND r.id NOT IN " +
            "(SELECT b.room.id FROM Booking b WHERE " +
            "b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)")
    List<Room> findAvailableRoomByDateAndTypes(@Param("checkInDate") LocalDate checkInDate,
                                               @Param("checkOutDate") LocalDate checkOutDate,
                                               @Param("roomType") String roomType);



}
