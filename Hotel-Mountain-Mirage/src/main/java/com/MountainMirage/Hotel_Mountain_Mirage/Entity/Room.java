package com.MountainMirage.Hotel_Mountain_Mirage.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomType;

    private BigDecimal RoomPrice;

    private String roomPhotoUrl;
    private String Description;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", RoomPrice=" + RoomPrice +
                ", roomPhotoUrl='" + roomPhotoUrl + '\'' +
                ", Description='" + Description + '\'' +
                ", bookings=" + bookings +
                '}';
    }
}
