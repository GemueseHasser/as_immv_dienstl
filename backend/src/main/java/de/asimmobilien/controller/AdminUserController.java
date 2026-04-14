package de.asimmobilien.controller;

import de.asimmobilien.dto.AdminUserUpsertRequest;
import de.asimmobilien.dto.UserResponse;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.service.AdminUserService;
import de.asimmobilien.security.SecurityUser;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {
    private final UserRepository userRepository;
    private final AdminUserService adminUserService;

    public AdminUserController(UserRepository userRepository, AdminUserService adminUserService) {
        this.userRepository = userRepository;
        this.adminUserService = adminUserService;
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


    @PostMapping
    public Map<String, Object> create(@Valid @RequestBody AdminUserUpsertRequest request) {
        return Map.of("ok", true, "user", UserResponse.of(adminUserService.create(request)));
    }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Long id, @Valid @RequestBody AdminUserUpsertRequest request,
                                      @AuthenticationPrincipal SecurityUser principal) {
        if (principal == null) throw new IllegalArgumentException("Nicht angemeldet.");
        return Map.of("ok", true, "user", UserResponse.of(adminUserService.update(id, request, principal.getUser())));
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
