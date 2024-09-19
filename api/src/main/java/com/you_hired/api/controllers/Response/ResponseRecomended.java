package com.you_hired.api.controllers.Response;

import com.you_hired.api.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseRecomended {
    Map<String, Integer> graus;
    List<User> recomended;
}
