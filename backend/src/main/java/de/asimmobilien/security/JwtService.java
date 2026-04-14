package de.asimmobilien.security;

import de.asimmobilien.config.AppProperties;
import de.asimmobilien.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private final AppProperties properties;
    public JwtService(AppProperties properties) { this.properties = properties; }
    private SecretKey key() { return Keys.hmacShaKeyFor(properties.getJwtSecret().getBytes(StandardCharsets.UTF_8)); }
    public String generateToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", user.getRole().name().toLowerCase())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(properties.getJwtExpirationHours(), ChronoUnit.HOURS)))
                .signWith(key())
                .compact();
    }
    public String extractUsername(String token) {
        return claims(token).getSubject();
    }
    public boolean isValid(String token) {
        return claims(token).getExpiration().after(new Date());
    }
    private Claims claims(String token) {
        return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload();
    }
}
