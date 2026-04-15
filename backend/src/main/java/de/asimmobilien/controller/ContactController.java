package de.asimmobilien.controller;

import de.asimmobilien.dto.ContactRequest;
import de.asimmobilien.model.ChatCategory;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.security.SecurityUser;
import de.asimmobilien.service.ChatService;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ChatService chatService;
    private final UserRepository userRepository;

    public ContactController(ChatService chatService, UserRepository userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Map<String, Object> send(@RequestBody ContactRequest request,
                                    @AuthenticationPrincipal SecurityUser principal) {
        if (principal == null) throw new IllegalArgumentException("Bitte zuerst anmelden.");
        if (!request.consent()) throw new IllegalArgumentException("Bitte die Datenschutzerklärung bestätigen.");
        if (request.website() != null && !request.website().isBlank()) throw new IllegalArgumentException("Anfrage konnte nicht verarbeitet werden.");
        if (!StringUtils.hasText(request.type())) throw new IllegalArgumentException("Bitte wählen Sie eine Anfrageart aus.");
        if (!StringUtils.hasText(request.message()) || request.message().trim().length() < 10) {
            throw new IllegalArgumentException("Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.");
        }

        var user = userRepository.findById(principal.getUser().getId()).orElseThrow();
        ChatCategory category = request.type().trim().toLowerCase().contains("dienst")
                ? ChatCategory.DIENSTLEISTUNGEN
                : ChatCategory.IMMOBILIENVERWALTUNG;
        var conversation = chatService.createContactConversation(category, request.service(), user, request.message().trim());
        return Map.of(
                "ok", true,
                "message", "Anfrage erfolgreich versendet.",
                "conversationId", conversation.getId()
        );
    }
}
