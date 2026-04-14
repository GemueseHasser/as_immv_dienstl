package de.asimmobilien.service;

import de.asimmobilien.dto.AdminUserUpsertRequest;
import de.asimmobilien.model.Role;
import de.asimmobilien.model.User;
import de.asimmobilien.repository.UserRepository;
import java.util.Locale;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User create(AdminUserUpsertRequest request) {
        String email = normalizedEmail(request.email());
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Diese E-Mail-Adresse ist bereits registriert.");
        }
        if (request.password() == null || request.password().trim().isEmpty()) {
            throw new IllegalArgumentException("Für neue Benutzer ist ein Passwort erforderlich.");
        }

        User user = new User();
        apply(user, request, true);
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiresAt(null);
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiresAt(null);
        return userRepository.save(user);
    }

    public User update(Long id, AdminUserUpsertRequest request, User actingUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Benutzer nicht gefunden."));
        String email = normalizedEmail(request.email());
        userRepository.findByEmailIgnoreCase(email)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException("Diese E-Mail-Adresse ist bereits registriert.");
                });

        Role newRole = parseRole(request.role());
        if (actingUser != null && actingUser.getId().equals(id) && newRole != Role.ADMIN) {
            throw new IllegalArgumentException("Der aktuell angemeldete Administrator kann seine Admin-Rolle nicht entfernen.");
        }

        apply(user, request, false);
        return userRepository.save(user);
    }

    private void apply(User user, AdminUserUpsertRequest request, boolean requirePassword) {
        user.setName(request.name().trim());
        user.setEmail(normalizedEmail(request.email()));
        user.setRole(parseRole(request.role()));

        String password = request.password();
        boolean hasPassword = password != null && !password.trim().isEmpty();
        if (requirePassword && !hasPassword) {
            throw new IllegalArgumentException("Für neue Benutzer ist ein Passwort erforderlich.");
        }
        if (hasPassword) {
            user.setPasswordHash(passwordEncoder.encode(password));
        }
    }

    private String normalizedEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }

    private Role parseRole(String role) {
        if (role == null || role.trim().isEmpty()) return Role.USER;
        return Role.valueOf(role.trim().toUpperCase(Locale.ROOT));
    }
}
