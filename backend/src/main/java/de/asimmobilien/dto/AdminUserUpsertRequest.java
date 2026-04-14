package de.asimmobilien.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record AdminUserUpsertRequest(
        @NotBlank String name,
        @Email @NotBlank String email,
        @NotBlank @Pattern(regexp = "user|admin", flags = Pattern.Flag.CASE_INSENSITIVE, message = "Ungültige Rolle.") String role,
        @Size(min = 6, message = "Das Passwort muss mindestens 6 Zeichen lang sein.") String password
) {}
