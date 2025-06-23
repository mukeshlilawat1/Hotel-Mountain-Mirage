package com.MountainMirage.Hotel_Mountain_Mirage.Service.Interfac;

import com.MountainMirage.Hotel_Mountain_Mirage.Dto.LoginRequest;
import com.MountainMirage.Hotel_Mountain_Mirage.Dto.Response;
import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;

public interface IUserService {
    Response register(User user);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response DeleteUser(String userId);
    Response getUserById(String userId);
    Response getUserInfo(String email);
}
