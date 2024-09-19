package com.you_hired.api.repositories;

import com.you_hired.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT c FROM User c WHERE c.userId IN (" +
            "SELECT CASE WHEN f.user1.userId = :userId THEN f.user2.userId ELSE f.user1.userId END FROM Follow f WHERE f.user1.userId = :userId OR f.user2.userId = :userId)")
    List<User> findFriendForUser(@Param("userId") Long userId);
}
