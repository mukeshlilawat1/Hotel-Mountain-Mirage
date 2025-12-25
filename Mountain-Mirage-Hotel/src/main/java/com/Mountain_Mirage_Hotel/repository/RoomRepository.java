package com.Mountain_Mirage_Hotel.repository;

import com.Mountain_Mirage_Hotel.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    // Get all distinct room types
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();

    // Get rooms which are not booked at all
    @Query("""
        SELECT r 
        FROM Room r 
        WHERE r.id NOT IN (
            SELECT b.room.id 
            FROM Booking b
        )
    """)
    List<Room> getAllAvailableRooms();

    // Get available rooms by date range and room type
    @Query("""
        SELECT r 
        FROM Room r
        WHERE r.roomType LIKE %:roomType%
        AND r.id NOT IN (
            SELECT b.room.id
            FROM Booking b
            WHERE b.checkInDate <= :checkOutDate
            AND b.checkOutDate >= :checkInDate
        )
    """)
    List<Room> findAvailableRoomByDateAndTypes(
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("roomType") String roomType
    );
}
