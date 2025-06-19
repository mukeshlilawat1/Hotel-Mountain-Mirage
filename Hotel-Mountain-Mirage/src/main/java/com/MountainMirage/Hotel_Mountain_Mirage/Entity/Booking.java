package com.MountainMirage.Hotel_Mountain_Mirage.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private LocalDate checkInDate;
    private  LocalDate checkOutDate;
    private int numOfAdults;
    private  int numOfChildren;
    private int totalNumOfGuest;

    private String bookingConfirmationCode;

    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Room_Id")
    private Room room;
    
}
