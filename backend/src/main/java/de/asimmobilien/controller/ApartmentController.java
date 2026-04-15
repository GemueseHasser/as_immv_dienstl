package de.asimmobilien.controller;

import de.asimmobilien.dto.ApartmentMessageRequest;
import de.asimmobilien.dto.ApartmentResponse;
import de.asimmobilien.model.Apartment;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.security.SecurityUser;
import de.asimmobilien.service.ApartmentService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/apartments")
public class ApartmentController {
    private final ApartmentService apartmentService;
    private final UserRepository userRepository;
    public ApartmentController(ApartmentService apartmentService, UserRepository userRepository) {
        this.apartmentService = apartmentService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Object> list(@RequestParam(name = "includeDrafts", defaultValue = "0") int includeDrafts,
                                    @AuthenticationPrincipal SecurityUser user) {
        boolean admin = user != null && user.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return Map.of("ok", true, "apartments", apartmentService.list(admin && includeDrafts == 1).stream().map(ApartmentResponse::summary).toList());
    }

    @GetMapping("/{slug}")
    public Map<String, Object> detail(@PathVariable String slug) {
        Apartment apartment = apartmentService.getPublishedBySlug(slug);
        return Map.of("ok", true, "apartment", ApartmentResponse.summary(apartment));
    }
    @PostMapping("/{id}/messages")
    public Map<String, Object> createMessage(@PathVariable Long id, @Valid @RequestBody ApartmentMessageRequest request,
                                             @AuthenticationPrincipal SecurityUser principal) {
        Apartment apartment = apartmentService.getAdminById(id);
        if (!apartment.isPublished()) throw new IllegalArgumentException("Wohnung nicht gefunden.");
        var user = userRepository.findById(principal.getUser().getId()).orElseThrow();
        var conversation = apartmentService.addMessage(apartment, user, request.message());
        return Map.of("ok", true, "message", "Nachricht versendet.", "conversationId", conversation.getId());
    }
}
