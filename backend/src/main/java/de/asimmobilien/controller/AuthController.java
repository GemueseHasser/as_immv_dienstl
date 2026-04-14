package de.asimmobilien.controller;

import de.asimmobilien.dto.AuthRequest;
import de.asimmobilien.dto.RegisterRequest;
import de.asimmobilien.dto.UserResponse;
import de.asimmobilien.security.SecurityUser;
import de.asimmobilien.service.AuthService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    public Map<String, Object> register(@Valid @RequestBody RegisterRequest request) { return authService.authPayload(authService.register(request)); }

    @PostMapping("/login")
    public Map<String, Object> login(@Valid @RequestBody AuthRequest request) { return authService.authPayload(authService.login(request)); }

    @GetMapping("/me")
    public Map<String, Object> me(@AuthenticationPrincipal SecurityUser user) {
        return Map.of("ok", true, "user", UserResponse.of(user.getUser()));
    }
}
