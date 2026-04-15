package de.asimmobilien.controller;

import de.asimmobilien.dto.ChatMessageRequest;
import de.asimmobilien.repository.UserRepository;
import de.asimmobilien.security.SecurityUser;
import de.asimmobilien.service.ChatService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/chats")
public class AdminChatController {
    private final ChatService chatService;
    private final UserRepository userRepository;

    public AdminChatController(ChatService chatService, UserRepository userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Object> list(@RequestParam(name = "category", defaultValue = "immobilienverwaltung") String category) {
        return Map.of(
                "ok", true,
                "conversations", chatService.listAdminConversations(category).stream().map(chatService::toConversationSummary).toList(),
                "unread", chatService.getAdminUnreadSummary()
        );
    }

    @GetMapping("/unread-summary")
    public Map<String, Object> unreadSummary() {
        return Map.of("ok", true, "unread", chatService.getAdminUnreadSummary());
    }

    @GetMapping("/{id}")
    public Map<String, Object> detail(@PathVariable Long id) {
        var conversation = chatService.getConversationForAdmin(id);
        chatService.markConversationReadForAdmin(conversation);
        return Map.of("ok", true, "conversation", chatService.toConversationDetail(chatService.getConversationForAdmin(id)));
    }

    @PostMapping("/{id}/messages")
    public Map<String, Object> reply(@PathVariable Long id,
                                     @Valid @RequestBody ChatMessageRequest request,
                                     @AuthenticationPrincipal SecurityUser principal) {
        var user = userRepository.findById(principal.getUser().getId()).orElseThrow();
        chatService.addAdminReply(id, user, request.message());
        return Map.of("ok", true, "message", "Antwort erfolgreich gesendet.");
    }
}
