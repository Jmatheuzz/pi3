package com.you_hired.api.controllers;

import com.you_hired.api.controllers.Response.ResponseRecomended;
import com.you_hired.api.entities.Follow;
import com.you_hired.api.entities.User;
import com.you_hired.api.services.FollowService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/follows")
public class FollowController {

    @Autowired
    private FollowService followService;


    @GetMapping("/recomendado/{id}")
    public ResponseRecomended getRecomendado(@PathVariable Long id) throws BadRequestException {
        return followService.getFollowsForYou(id);
    }


    @PostMapping
    public Follow createFollow(@RequestBody Follow follow) {
        return followService.createJob(follow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        followService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
