package de.asimmobilien.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(@NotBlank String token, @Size(min = 6) String password) {}
