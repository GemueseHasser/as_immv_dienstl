package de.asimmobilien.service;

import de.asimmobilien.config.AppProperties;
import de.asimmobilien.model.Role;
import de.asimmobilien.model.User;
import de.asimmobilien.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties properties;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder, AppProperties properties) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.properties = properties;
    }

    @Override
    public void run(String... args) {
        userRepository.findByEmailIgnoreCase(properties.getAdminEmail()).orElseGet(() -> {
            User admin = new User();
            admin.setName(properties.getAdminName());
            admin.setEmail(properties.getAdminEmail().toLowerCase());
            admin.setPasswordHash(passwordEncoder.encode(properties.getAdminPassword()));
            admin.setRole(Role.ADMIN);
            return userRepository.save(admin);
        });
    }
}
