package com.Mountain_Mirage_Hotel.service.impl;


import com.Mountain_Mirage_Hotel.dto.LoginRequest;
import com.Mountain_Mirage_Hotel.dto.Response;
import com.Mountain_Mirage_Hotel.dto.UserDTO;
import com.Mountain_Mirage_Hotel.entity.User;
import com.Mountain_Mirage_Hotel.exception.OurException;
import com.Mountain_Mirage_Hotel.repository.UserRepository;
import com.Mountain_Mirage_Hotel.service.interfac.IUserService;
import com.Mountain_Mirage_Hotel.utils.JWTUtils;
import com.Mountain_Mirage_Hotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Response register(User user) {
        Response response = new Response();

        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + " already exists");
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

            response.setStatusCode(200);
            response.setUser(userDTO);
            response.setMessage("User Registration Successful");
        }catch (OurException ex) {
            response.setStatusCode(400);
            response.setMessage(ex.getMessage());
        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error Saving a User " + ex.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();
        try {
             authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                     loginRequest.getEmail(), loginRequest.getPassword()));
             User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new OurException("User not found"));
             var token = jwtUtils.generateToken(user);

             response.setToken(token);
             response.setExpirationTime("7 Days");
             response.setRole(user.getRole());
             response.setMessage("Successfully Logged IN");

            response.setStatusCode(200);

        }catch (OurException ex) {
            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error Logging in " + ex.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUser() {
        Response response = new Response();
        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOSList = Utils.mapUserListEntityToUserListDTO(userList);
            response.setUserDTOList(userDTOSList);
            response.setMessage("getAllUser successful");
            response.setStatusCode(200);

        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users " + ex.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserBookingHistory(String userId) {
        Response response = new Response();
        try {
            User user = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusBookingsAndRooms(user);
            response.setMessage("Successfully Logged IN");
            response.setStatusCode(200);
            response.setUser(userDTO);
        }catch (OurException ex) {
            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error getting user booking in " + ex.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteUser(String userId) {
        Response response = new Response();
        try {
            userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User not found"));
            userRepository.deleteById(Long.valueOf(userId));

            response.setMessage("Successfully Logged IN");
            response.setStatusCode(200);

        }catch (OurException ex) {
            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error deleting a user " + ex.getMessage());
        }
        return response;
    }

    @Override
    public Response getUserById(String userId) {
        Response response = new Response();
        try {
         User user = userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new OurException("User Not found"));
         UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setMessage("Successfully Logged IN");
            response.setStatusCode(200);
            response.setUser(userDTO);

        }catch (OurException ex) {
            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error Getting a user by id" + ex.getMessage());
        }
        return response;
    }

    @Override
    public Response getMyInfo(String email) {
        Response response = new Response();
        try {
            User user = userRepository.findByEmail(email).orElseThrow(() -> new OurException("User not found"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);

            response.setMessage("Successfully Logged IN");
            response.setStatusCode(200);
            response.setUser(userDTO);

        }catch (OurException ex) {
            response.setStatusCode(404);
            response.setMessage(ex.getMessage());
        }catch (Exception ex) {
            response.setStatusCode(500);
            response.setMessage("Error getting a user info " + ex.getMessage());
        }
        return response;
    }
}
