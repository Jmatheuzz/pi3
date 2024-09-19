package com.you_hired.api.utils;

import com.you_hired.api.entities.Follow;
import com.you_hired.api.entities.User;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.*;

@Getter
@Component
public class AmizadeUtils {
    Map<User, Integer> graus = new HashMap<>();
    public List<User> sugerirAmigos(Map<User, List<User>> grafo, List<User> meusAmigos, User usuarioInicial) {
        final var sugeridosEmComum = sugerirAmigosEmComum(grafo, usuarioInicial);
        List<User> sugeridos = new ArrayList<>(sugeridosEmComum);
        for (User user: sugeridosEmComum) {
            List<User> suferido = buscarAmigosDeExcetoMeusAmigos(grafo, user, meusAmigos);
            sugeridos.addAll(suferido);
        }
        return sugeridos;
    }
    public List<User> sugerirAmigosEmComum(Map<User, List<User>> grafo, User usuarioInicial) {
        List<User> sugeridos = new ArrayList<>();
        Map<User, Integer> contagemAmigosEmComum = new HashMap<>();

        // Obtenha os amigos diretos do usuário inicial
        List<User> amigosDiretos = grafo.getOrDefault(usuarioInicial, new ArrayList<>());

        // Itera sobre os amigos diretos
        for (User amigoDireto : amigosDiretos) {
            // Pega os amigos dos amigos (amigos de 2º grau)
            List<User> amigosDoAmigo = grafo.getOrDefault(amigoDireto, new ArrayList<>());

            // Itera sobre os amigos do amigo
            for (User amigoDoAmigo : amigosDoAmigo) {
                // Ignora o próprio usuário e amigos diretos
                if (!amigoDoAmigo.equals(usuarioInicial) && !amigosDiretos.contains(amigoDoAmigo)) {
                    // Conta a quantidade de amigos em comum
                    contagemAmigosEmComum.put(amigoDoAmigo, contagemAmigosEmComum.getOrDefault(amigoDoAmigo, 1) + 1);
                }
            }
        }

        // Ordena os amigos sugeridos com base no número de amigos em comum
        List<Map.Entry<User, Integer>> listaAmigosEmComum = new ArrayList<>(contagemAmigosEmComum.entrySet());
        listaAmigosEmComum.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        // Pega os top 3 amigos sugeridos
        for (int i = 0; i < Math.min(3, listaAmigosEmComum.size()); i++) {
            sugeridos.add(listaAmigosEmComum.get(i).getKey());
        }
        this.graus.putAll(contagemAmigosEmComum);
        return sugeridos;
    }
    public Map<User, List<User>> construirGrafoDeAmizades(List<Follow> amizades) {
        Map<User, List<User>> grafo = new HashMap<>();


        // Constrói o grafo
        for (Follow amizade : amizades) {
            User user1 = amizade.getUser1();
            User user2 = amizade.getUser2();

            // Adiciona user2 à lista de amigos de user1
            grafo.computeIfAbsent(user1, k -> new ArrayList<>()).add(user2);

            // Adiciona user1 à lista de amigos de user2
            grafo.computeIfAbsent(user2, k -> new ArrayList<>()).add(user1);
        }

        return grafo;
    }
    // Novo método para retornar os amigos diretos de uma pessoa
    public List<User> buscarAmigosDe(Map<User, List<User>> grafo, User usuario) {
        return grafo.getOrDefault(usuario, new ArrayList<>());
    }
    public List<User> buscarAmigosDeExcetoMeusAmigos(Map<User, List<User>> grafo, User usuario, List<User> meusAmigos) {
        final var amigosDe = grafo.getOrDefault(usuario, new ArrayList<>());
        List<User> result = new ArrayList<>();
        for (User user: amigosDe) {
            if (!meusAmigos.contains(user)) {
                this.graus.put(user, 3);
                result.add(user);
            }
        }
        return result;
    }
}
