package com.you_hired.api.controllers;

import com.you_hired.api.controllers.Body.LoginDTO;
import com.you_hired.api.controllers.Response.LoginResponse;
import com.you_hired.api.entities.User;
import com.you_hired.api.services.AuthService;
import com.you_hired.api.services.UserService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponse createUser(@RequestBody LoginDTO data) throws Exception {
        return authService.login(data.getEmail(), data.getPassword());
    }
}
