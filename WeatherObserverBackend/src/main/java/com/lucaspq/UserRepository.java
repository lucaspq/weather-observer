package com.lucaspq;

import java.util.Optional;

import com.lucaspq.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query( "SELECT user FROM User user WHERE user.email = :email" )
    Optional<User> findByEmail(@Param("email") String email);
}
