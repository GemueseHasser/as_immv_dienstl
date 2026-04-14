package de.asimmobilien.dto;

import de.asimmobilien.model.User;
import java.util.Map;

public class UserResponse {
    public static Map<String, Object> of(User user) {
        return Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole().name().toLowerCase()
        );
    }
}
