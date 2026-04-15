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
@RequestMapping("/api/chats")
public class ChatController {
    private final ChatService chatService;
    private final UserRepository userRepository;

    public ChatController(ChatService chatService, UserRepository userRepository) {
        this.chatService = chatService;
        this.userRepository = userRepository;
    }

    @GetMapping("/my")
    public Map<String, Object> myChats(@AuthenticationPrincipal SecurityUser principal) {
        var user = userRepository.findById(principal.getUser().getId()).orElseThrow();
        return Map.of("ok", true, "conversations", chatService.listUserConversations(user).stream().map(chatService::toConversationSummary).toList());
    }

    @GetMapping("/{id}")
    public Map<String, Object> myChatDetail(@PathVariable Long id, @AuthenticationPrincipal SecurityUser principal) {
        var user = userRepository.findById(principal.getUser().getId()).orElseThrow();
        return Map.of("ok", true, "conversation", chatService.toConversationDetail(chatService.getConversationForUser(id, user)));
    }

    @PostMapping("/{id}/messages")
    public Map<String, Object> reply(@PathVariable Long id,
                                     @Valid @RequestBody ChatMessageRequest request,
                                     @AuthenticationPrincipal SecurityUser principal) {
        var user = userRepository.findById(principal.getUser().getId()).orElseThrow();
        chatService.addUserReply(id, user, request.message());
        return Map.of("ok", true, "message", "Nachricht erfolgreich gesendet.");
    }
}
