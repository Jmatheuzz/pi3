package com.you_hired.api.services;


import com.you_hired.api.controllers.Body.DeleteAccount;
import com.you_hired.api.entities.User;
import com.you_hired.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        user.setPasswordHash(new BCryptPasswordEncoder().encode(user.getPasswordHash()));
        user.setUsername("user_" + generateUsername());
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setAbout(userDetails.getAbout());
            user.setPosition(userDetails.getPosition());
            user.setUsername(userDetails.getUsername());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUser(Long id, DeleteAccount data) throws Exception {
        final var result = authService.login(data.getEmail(), data.getPassword());
        if (result != null) userRepository.deleteById(id);
        else throw new Exception("Dados inválidos");
    }

    private String generateUsername() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder username = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 10; i++) {
            int index = random.nextInt(chars.length());
            username.append(chars.charAt(index));
        }

        return username.toString();
    }
}
