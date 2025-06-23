package com.MountainMirage.Hotel_Mountain_Mirage.Service.Imp;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.LoginRequest;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.UserDTO;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;
import com.MountainMirage.Hotel_Mountain_Mirage.Exception.OurException;
import com.MountainMirage.Hotel_Mountain_Mirage.Repo.UserRepository;
import com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac.IUserService;
import com.MountainMirage.Hotel_Mountain_Mirage.Utils.JWTUtils;
import com.MountainMirage.Hotel_Mountain_Mirage.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {

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
                throw new OurException(user.getEmail() + " " + "Email Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
            response.setMessage("Successfully");
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Saving a User " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
      Response response = new Response();

      try {
          authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
          var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new OurException("User Not Found"));
          var token = jwtUtils.generateToken(user);
          response.setToken(token);
          response.setExpirationTime("7 days");
          response.setRole(user.getRole());
          response.setMessage("Logged in Successfully");

          response.setStatusCode(200);
      } catch (OurException e) {
          response.setStatusCode(400);
          response.setMessage(e.getMessage());
      } catch (Exception e) {
          response.setStatusCode(500);
          response.setMessage("Error Logging in " + e.getMessage());
      }
      return response;
    }

    @Override
    public Response getAllUsers() {
      Response response = new Response();

      try {

          List<User> userList = userRepository.findAll();
          List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
          response.setUserList(userDTOList);
          response.setMessage("Successfully");
          response.setStatusCode(200);

      } catch (Exception e) {
          response.setStatusCode(500);
          response.setMessage(e.getMessage());
      }
      return response;
    }

    @Override
    public Response getUserBookingHistory(String userId) {
        return null;
    }

    @Override
    public Response DeleteUser(String userId) {
        return null;
    }

    @Override
    public Response getUserById(String userId) {
        return null;
    }

    @Override
    public Response getUserInfo(String email) {
        return null;
    }
}
