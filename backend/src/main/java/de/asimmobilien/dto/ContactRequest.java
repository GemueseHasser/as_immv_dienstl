package de.asimmobilien.dto;

import jakarta.validation.constraints.Email;

public record ContactRequest(
        @Email String email,
        String message,
        String type,
        String service,
        boolean consent,
        String website,
        Long startedAt) {}
