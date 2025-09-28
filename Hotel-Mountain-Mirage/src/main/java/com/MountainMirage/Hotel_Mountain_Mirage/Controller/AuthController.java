package com.MountainMirage.Hotel_Mountain_Mirage.Controller;


import com.MountainMirage.Hotel_Mountain_Mirage.Dto.LoginRequest;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac.IUserService;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private IUserService userService;
    @Autowired
    private HandlerMapping resourceHandlerMapping;
//
//    @PostMapping("/register")
//    public ResponseEntity<Response> register(@RequestBody User user){
//        Response response = userService.register(user);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }


    @PermitAll
    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody User user) {
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/Login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest){
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
