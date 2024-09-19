package com.you_hired.api.services;

import com.you_hired.api.controllers.Response.LoginResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final String loginUrl = "http://localhost:3000/login";
    private final String verifyUrl = "http://localhost:3000/verify";

    @Autowired
    private RestTemplate restTemplate;



    public LoginResponse login(String email, String password) throws Exception {
        // Criando o corpo da requisição
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", email);
        requestBody.put("password", password);

        // Cabeçalhos
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Montando a requisição
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        try {
            // Fazendo a chamada para a API Node.js
            ResponseEntity<Map> response = restTemplate.postForEntity(loginUrl, request, Map.class);

            // Pegando o token da resposta
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return new LoginResponse((String) response.getBody().get("token"), (String) response.getBody().get("userId"));
            }

            if (response.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new BadRequestException("Dados inválidos");
            }

            return null;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public boolean verifyToken(String token) {
        // Criando o corpo da requisição
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("token", token);

        // Cabeçalhos
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Montando a requisição
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        // Fazendo a chamada para a API Node.js
        ResponseEntity<Map> response = restTemplate.postForEntity(verifyUrl, request, Map.class);

        // Verificando o retorno do payload
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return (boolean) response.getBody().get("valid");
        }

        return false;
    }
}

