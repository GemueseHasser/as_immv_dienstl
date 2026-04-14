package de.asimmobilien.controller;

import de.asimmobilien.dto.UserResponse;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.security.SecurityUser;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {
    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Object> list() {
        return Map.of(
                "ok", true,
                "users", userRepository.findAll().stream()
                        .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                        .map(UserResponse::of)
                        .toList()
        );
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Long id, @AuthenticationPrincipal SecurityUser principal) {
        if (principal == null) throw new IllegalArgumentException("Nicht angemeldet.");
        if (principal.getUser().getId().equals(id)) {
            throw new IllegalArgumentException("Der aktuell angemeldete Administrator kann nicht gelöscht werden.");
        }
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Benutzer nicht gefunden.");
        }
        userRepository.deleteById(id);
        return Map.of("ok", true);
    }
}
