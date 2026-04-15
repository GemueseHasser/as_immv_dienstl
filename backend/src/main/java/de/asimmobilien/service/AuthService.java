package de.asimmobilien.service;

import de.asimmobilien.config.AppProperties;
import de.asimmobilien.dto.AuthRequest;
import de.asimmobilien.dto.RegisterRequest;
import de.asimmobilien.model.Role;
import de.asimmobilien.model.User;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.security.JwtService;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MailService mailService;
    private final AppProperties properties;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
                       MailService mailService, AppProperties properties) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.properties = properties;
    }

    public Map<String, Object> register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Diese E-Mail-Adresse ist bereits registriert.");
        }
        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(normalizeEmail(request.email()));
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);
        user.setEmailVerified(false);
        user.setVerificationToken(newToken());
        user.setVerificationTokenExpiresAt(LocalDateTime.now().plus(24, ChronoUnit.HOURS));
        User savedUser = userRepository.save(user);
        sendVerificationEmail(savedUser);
        return Map.of(
                "ok", true,
                "message", "Ihr Konto wurde erstellt. Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse."
        );
    }

    public User login(AuthRequest request) {
        User user = userRepository.findByEmailIgnoreCase(request.email().trim())
                .orElseThrow(() -> new BadCredentialsException("Ungültige Zugangsdaten."));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Ungültige Zugangsdaten.");
        }
        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException("Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.");
        }
        return user;
    }

    public Map<String, Object> verifyEmail(String token) {
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Der Bestätigungslink ist ungültig oder bereits verbraucht."));
        if (user.getVerificationTokenExpiresAt() == null || user.getVerificationTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Der Bestätigungslink ist abgelaufen. Bitte registrieren Sie sich erneut oder fordern Sie einen neuen Link an.");
        }
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiresAt(null);
        userRepository.save(user);
        return Map.of("ok", true, "message", "Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Sie können sich jetzt anmelden.");
    }

    public Map<String, Object> forgotPassword(String email) {
        userRepository.findByEmailIgnoreCase(normalizeEmail(email)).ifPresent(user -> {
            user.setResetPasswordToken(newToken());
            user.setResetPasswordTokenExpiresAt(LocalDateTime.now().plus(2, ChronoUnit.HOURS));
            userRepository.save(user);
            sendResetPasswordEmail(user);
        });
        return Map.of("ok", true, "message", "Falls ein Konto mit dieser E-Mail-Adresse existiert, wurde ein Link zum Zurücksetzen des Passworts versendet.");
    }

    public Map<String, Object> resetPassword(String token, String password) {
        User user = userRepository.findByResetPasswordToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Der Link zum Zurücksetzen des Passworts ist ungültig oder bereits verbraucht."));
        if (user.getResetPasswordTokenExpiresAt() == null || user.getResetPasswordTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Der Link zum Zurücksetzen des Passworts ist abgelaufen. Bitte fordern Sie einen neuen Link an.");
        }
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiresAt(null);
        userRepository.save(user);
        return Map.of("ok", true, "message", "Ihr Passwort wurde erfolgreich geändert. Sie können sich jetzt anmelden.");
    }

    public Map<String, Object> authPayload(User user) {
        return Map.of("ok", true, "token", jwtService.generateToken(user), "user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole().name().toLowerCase(Locale.ROOT)
        ));
    }

    private void sendVerificationEmail(User user) {
        String verificationUrl = UriComponentsBuilder
                .fromUriString(resolvePublicBaseUrl())
                .path("/#/anmelden")
                .queryParam("verify", user.getVerificationToken())
                .build()
                .toUriString();
        mailService.sendVerificationEmail(user.getEmail(), user.getName(), verificationUrl);
    }

    private void sendResetPasswordEmail(User user) {
        String resetUrl = UriComponentsBuilder
                .fromUriString(resolvePublicBaseUrl())
                .path("/#/anmelden")
                .queryParam("reset", user.getResetPasswordToken())
                .build()
                .toUriString();
        mailService.sendResetPasswordEmail(user.getEmail(), user.getName(), resetUrl);
    }

    private String resolvePublicBaseUrl() {
        String requestBaseUrl = resolveCurrentRequestBaseUrl();
        if (StringUtils.hasText(requestBaseUrl)) {
            return requestBaseUrl;
        }
        if (StringUtils.hasText(properties.getPublicBaseUrl())) {
            return properties.getPublicBaseUrl().replaceAll("/+$", "");
        }
        return "http://localhost";
    }

    private String resolveCurrentRequestBaseUrl() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (!(attributes instanceof ServletRequestAttributes servletAttributes)) {
            return null;
        }
        HttpServletRequest request = servletAttributes.getRequest();
        String forwardedProto = trimToNull(request.getHeader("X-Forwarded-Proto"));
        String forwardedHost = trimToNull(request.getHeader("X-Forwarded-Host"));
        String forwardedPort = trimToNull(request.getHeader("X-Forwarded-Port"));

        String scheme = forwardedProto != null ? forwardedProto : request.getScheme();
        String hostHeader = forwardedHost != null ? forwardedHost : request.getHeader("Host");
        if (!StringUtils.hasText(hostHeader)) {
            hostHeader = request.getServerName();
            int serverPort = request.getServerPort();
            if (serverPort > 0 && !isDefaultPort(scheme, serverPort)) {
                hostHeader = hostHeader + ":" + serverPort;
            }
        }

        if (!StringUtils.hasText(hostHeader)) {
            return null;
        }

        if (StringUtils.hasText(forwardedPort) && !hostHeader.contains(":")) {
            int port = safeParsePort(forwardedPort);
            if (port > 0 && !isDefaultPort(scheme, port)) {
                hostHeader = hostHeader + ":" + port;
            }
        }

        return scheme + "://" + hostHeader.replaceAll("/+$", "");
    }

    private boolean isDefaultPort(String scheme, int port) {
        return ("http".equalsIgnoreCase(scheme) && port == 80)
                || ("https".equalsIgnoreCase(scheme) && port == 443);
    }

    private int safeParsePort(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            return -1;
        }
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        String normalized = value.split(",")[0].trim();
        return normalized.isEmpty() ? null : normalized;
    }

    private String newToken() {
        return UUID.randomUUID().toString() + UUID.randomUUID().toString().replace("-", "");
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
