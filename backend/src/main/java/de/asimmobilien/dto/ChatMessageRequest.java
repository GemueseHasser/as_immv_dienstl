package de.asimmobilien.dto;

import jakarta.validation.constraints.NotBlank;

public record ChatMessageRequest(@NotBlank(message = "Bitte eine Nachricht eingeben.") String message) {
}
