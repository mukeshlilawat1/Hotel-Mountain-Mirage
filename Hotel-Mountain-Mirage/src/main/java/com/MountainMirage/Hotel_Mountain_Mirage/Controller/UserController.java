package com.MountainMirage.Hotel_Mountain_Mirage.Controller;


import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Imp.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.net.Authenticator;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers() {
        Response response = userService.getAllUsers();
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-by-id/{userId}")
    public ResponseEntity<Response> getUserById(@PathVariable("userId") String userId) {
        Response response = userService.getUserById(userId);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/delete/{userId}")
    public ResponseEntity<Response> deleteUserById(@PathVariable("userId") String userId) {
        Response response = userService.DeleteUser(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-logged-in-profile-info")
    public ResponseEntity<Response> getLoggedInUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String Email = authentication.getName();
        Response response = userService.getUserById(Email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/get-user-bookings/{userId}")
    public ResponseEntity<Response> getUserBookingHistory(@PathVariable("userId") String userId) {
        Response response = userService.getUserBookingHistory(userId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

//    @PostMapping("/register")
//    public ResponseEntity<Response> registerUser(@RequestBody User user) {
//        Response response = userService.register(user);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }

}
