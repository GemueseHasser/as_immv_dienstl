package de.asimmobilien.dto;

import jakarta.validation.constraints.NotBlank;

public record ApartmentMessageRequest(@NotBlank String message) {}
