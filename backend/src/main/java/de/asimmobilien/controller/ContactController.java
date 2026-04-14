package de.asimmobilien.controller;

import de.asimmobilien.dto.ContactRequest;
import de.asimmobilien.security.SecurityUser;
import de.asimmobilien.service.MailService;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final MailService mailService;
    public ContactController(MailService mailService) { this.mailService = mailService; }

    @PostMapping
    public Map<String, Object> send(@RequestBody ContactRequest request,
                                    @AuthenticationPrincipal SecurityUser principal) {
        if (!request.consent()) throw new IllegalArgumentException("Bitte die Datenschutzerklärung bestätigen.");
        if (request.website() != null && !request.website().isBlank()) throw new IllegalArgumentException("Anfrage konnte nicht verarbeitet werden.");
        if (!StringUtils.hasText(request.type())) throw new IllegalArgumentException("Bitte wählen Sie eine Anfrageart aus.");
        if (!StringUtils.hasText(request.message()) || request.message().trim().length() < 10) {
            throw new IllegalArgumentException("Bitte eine Nachricht mit mindestens 10 Zeichen eingeben.");
        }

        String senderEmail = principal != null ? principal.getUser().getEmail() : request.email();
        if (!StringUtils.hasText(senderEmail)) {
            throw new IllegalArgumentException("Bitte eine gültige E-Mail-Adresse eingeben.");
        }

        String subject = "Neue Kontaktanfrage: " + request.type();
        String text = "Typ: " + request.type() + "\n"
                + "Service: " + (request.service() == null ? "" : request.service()) + "\n"
                + "E-Mail: " + senderEmail + "\n"
                + "Name: " + (principal != null ? principal.getUser().getName() : "") + "\n\n"
                + request.message().trim();
        mailService.send(subject, text);
        return Map.of("ok", true, "message", "Anfrage erfolgreich versendet.");
    }
}
