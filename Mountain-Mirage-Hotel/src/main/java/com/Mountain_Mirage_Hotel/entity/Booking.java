package com.Mountain_Mirage_Hotel.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "check in date is required")
    private LocalDate checkInDate;

    @Future(message = "Check out date must be in the feature")
    private LocalDate checkOutDate;

    @Min(value = 1, message = "Number of Adults should not be less than one")
    private int numOfAdults;

    @Min(value = 0, message = "Number of children should not be less then zero")
    private int numOfChildren;


    private int totalNumOfGuest;

    private String bookingConfirmationCode;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private  User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @ToString.Exclude
    private Room room;

    public void calculateTotalNumOfGuest() {
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculateTotalNumOfGuest();
    }

    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculateTotalNumOfGuest();
    }


//    @Override
//    public String toString() {
//        return "Booking{" +
//                "id=" + id +
//                ", checkInDate=" + checkInDate +
//                ", checkOutDate=" + checkOutDate +
//                ", numOfAdults=" + numOfAdults +
//                ", numOfChildren=" + numOfChildren +
//                ", totalNumOfGuest=" + totalNumOfGuest +
//                ", bookingConfirmationCode='" + bookingConfirmationCode + '\'' +
//                ", user=" + user +
//                ", room=" + room +
//                '}';
//    }
}
