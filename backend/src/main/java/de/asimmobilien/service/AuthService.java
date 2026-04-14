package de.asimmobilien.service;

import de.asimmobilien.dto.AuthRequest;
import de.asimmobilien.dto.RegisterRequest;
import de.asimmobilien.model.Role;
import de.asimmobilien.model.User;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.security.JwtService;
import java.util.Map;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Diese E-Mail-Adresse ist bereits registriert.");
        }
        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(request.email().trim().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);
        return userRepository.save(user);
    }

    public User login(AuthRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new BadCredentialsException("Ungültige Zugangsdaten."));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Ungültige Zugangsdaten.");
        }
        return user;
    }

    public Map<String, Object> authPayload(User user) {
        return Map.of("ok", true, "token", jwtService.generateToken(user), "user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole().name().toLowerCase()
        ));
    }
}
