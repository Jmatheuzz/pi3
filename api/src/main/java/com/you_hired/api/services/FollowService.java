package com.you_hired.api.services;

import com.you_hired.api.controllers.Response.ResponseRecomended;
import com.you_hired.api.entities.Follow;
import com.you_hired.api.entities.User;
import com.you_hired.api.repositories.FollowRepository;
import com.you_hired.api.repositories.UserRepository;
import com.you_hired.api.utils.AmizadeUtils;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AmizadeUtils amizadeUtils;


    public ResponseRecomended getFollowsForYou(Long id) throws BadRequestException {
        Optional<User> principalUser = userService.getUserById(id);
        List<User> users = userService.getAllUsers();
        Map<User, List<User>> grafo = amizadeUtils.construirGrafoDeAmizades(followRepository.findAll());
        if (principalUser.isPresent()){
            List<User> friends = userRepository.findFriendForUser(id);
            List<User> recomendados = amizadeUtils.sugerirAmigos(grafo, friends, principalUser.get());
            var i = 0;
            while(recomendados.size() < 3 && i < users.size()) {
                if ((

                        !recomendados.contains(users.get(i)))
                        && !Objects.equals(users.get(i).getUserId(), id)
                        && !friends.contains(users.get(i))

                ) recomendados.add(users.get(i));
                i++;
            }
            return new ResponseRecomended(null, recomendados);
        }

        throw new BadRequestException();
    }

    public Follow createJob(Follow follow) {
        return followRepository.save(follow);
    }


    public void deleteJob(Long id) {
        followRepository.deleteById(id);
    }
}
