package com.Mountain_Mirage_Hotel.service.interfac;

import com.Mountain_Mirage_Hotel.dto.LoginRequest;
import com.Mountain_Mirage_Hotel.dto.Response;
import com.Mountain_Mirage_Hotel.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUSerBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
