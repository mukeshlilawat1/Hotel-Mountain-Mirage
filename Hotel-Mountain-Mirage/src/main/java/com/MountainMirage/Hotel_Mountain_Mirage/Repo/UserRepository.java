package com.MountainMirage.Hotel_Mountain_Mirage.Repo;

import com.MountainMirage.Hotel_Mountain_Mirage.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
