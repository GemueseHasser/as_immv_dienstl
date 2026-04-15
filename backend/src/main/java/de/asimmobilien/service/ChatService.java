package de.asimmobilien.service;

import de.asimmobilien.model.*;
import de.asimmobilien.repository.ChatConversationRepository;
import de.asimmobilien.repository.ChatMessageRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ChatService {
    private final ChatConversationRepository conversationRepository;
    private final ChatMessageRepository messageRepository;
    private final MailService mailService;

    public ChatService(ChatConversationRepository conversationRepository,
                       ChatMessageRepository messageRepository,
                       MailService mailService) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.mailService = mailService;
    }

    @Transactional
    public ChatConversation createContactConversation(ChatCategory category, String serviceLabel, User user, String initialMessage) {
        ChatConversation conversation = new ChatConversation();
        conversation.setCategory(category);
        conversation.setServiceLabel(StringUtils.hasText(serviceLabel) ? serviceLabel.trim() : null);
        conversation.setSubject(category == ChatCategory.DIENSTLEISTUNGEN
                ? "Dienstleistungsanfrage" + (StringUtils.hasText(serviceLabel) ? ": " + serviceLabel.trim() : "")
                : "Anfrage zur Immobilienverwaltung");
        conversation.setUser(user);
        ChatConversation savedConversation = conversationRepository.save(conversation);
        ChatMessage savedMessage = addMessageInternal(savedConversation, user, roleLabel(user), initialMessage);
        mailService.sendAdminNotificationForChat(savedConversation, savedMessage);
        return savedConversation;
    }

    @Transactional
    public ChatConversation createApartmentConversation(Apartment apartment, User user, String initialMessage) {
        ChatConversation conversation = new ChatConversation();
        conversation.setCategory(ChatCategory.IMMOBILIENVERWALTUNG);
        conversation.setSubject("Wohnungsanfrage: " + apartment.getTitle());
        conversation.setApartment(apartment);
        conversation.setUser(user);
        ChatConversation savedConversation = conversationRepository.save(conversation);
        ChatMessage savedMessage = addMessageInternal(savedConversation, user, roleLabel(user), initialMessage);
        mailService.sendAdminNotificationForChat(savedConversation, savedMessage);
        return savedConversation;
    }

    public List<ChatConversation> listUserConversations(User user) {
        return conversationRepository.findByUserIdOrderByUpdatedAtDesc(user.getId());
    }

    public List<ChatConversation> listAdminConversations(String categoryKey) {
        ChatCategory category = "dienstleistungen".equalsIgnoreCase(categoryKey)
                ? ChatCategory.DIENSTLEISTUNGEN
                : ChatCategory.IMMOBILIENVERWALTUNG;
        return conversationRepository.findByCategoryOrderByUpdatedAtDesc(category);
    }

    public ChatConversation getConversationForUser(Long id, User user) {
        ChatConversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Chat nicht gefunden."));
        if (!conversation.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Chat nicht gefunden.");
        }
        return conversation;
    }

    public ChatConversation getConversationForAdmin(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Chat nicht gefunden."));
    }

    @Transactional
    public ChatMessage addUserReply(Long conversationId, User user, String message) {
        ChatConversation conversation = getConversationForUser(conversationId, user);
        ChatMessage savedMessage = addMessageInternal(conversation, user, roleLabel(user), message);
        mailService.sendAdminNotificationForChat(conversation, savedMessage);
        return savedMessage;
    }

    @Transactional
    public ChatMessage addAdminReply(Long conversationId, User adminUser, String message) {
        ChatConversation conversation = getConversationForAdmin(conversationId);
        ChatMessage savedMessage = addMessageInternal(conversation, adminUser, roleLabel(adminUser), message);
        mailService.sendUserNotificationForChat(conversation, savedMessage);
        return savedMessage;
    }

    private ChatMessage addMessageInternal(ChatConversation conversation, User sender, String senderRole, String message) {
        if (!StringUtils.hasText(message) || message.trim().length() < 2) {
            throw new IllegalArgumentException("Bitte eine Nachricht mit mindestens 2 Zeichen eingeben.");
        }
        ChatMessage entity = new ChatMessage();
        entity.setConversation(conversation);
        entity.setSenderUser(sender);
        entity.setSenderName(sender.getName());
        entity.setSenderRole(senderRole);
        entity.setMessage(message.trim());
        ChatMessage saved = messageRepository.save(entity);
        conversation.setUpdatedAt(LocalDateTime.now());
        conversationRepository.save(conversation);
        return saved;
    }

    public Map<String, Object> toConversationSummary(ChatConversation conversation) {
        java.util.List<ChatMessage> messages = conversation.getMessages();
        ChatMessage lastMessage = messages != null && !messages.isEmpty() ? messages.get(messages.size() - 1) : null;

        Map<String, Object> summary = new java.util.LinkedHashMap<>();
        summary.put("id", conversation.getId());
        summary.put("category", conversation.getCategory().name());
        summary.put("subject", conversation.getSubject());
        summary.put("serviceLabel", conversation.getServiceLabel() == null ? "" : conversation.getServiceLabel());
        summary.put("apartmentTitle", conversation.getApartment() != null ? conversation.getApartment().getTitle() : "");
        summary.put("apartmentSlug", conversation.getApartment() != null ? conversation.getApartment().getSlug() : "");
        summary.put("userName", conversation.getUser().getName());
        summary.put("userEmail", conversation.getUser().getEmail());
        summary.put("createdAt", conversation.getCreatedAt());
        summary.put("updatedAt", conversation.getUpdatedAt());
        summary.put("lastMessage", lastMessage != null ? lastMessage.getMessage() : "");
        return summary;
    }

    public Map<String, Object> toConversationDetail(ChatConversation conversation) {
        return Map.of(
                "id", conversation.getId(),
                "category", conversation.getCategory().name(),
                "subject", conversation.getSubject(),
                "serviceLabel", conversation.getServiceLabel() == null ? "" : conversation.getServiceLabel(),
                "apartmentTitle", conversation.getApartment() != null ? conversation.getApartment().getTitle() : "",
                "apartmentSlug", conversation.getApartment() != null ? conversation.getApartment().getSlug() : "",
                "user", Map.of(
                        "id", conversation.getUser().getId(),
                        "name", conversation.getUser().getName(),
                        "email", conversation.getUser().getEmail()
                ),
                "createdAt", conversation.getCreatedAt(),
                "updatedAt", conversation.getUpdatedAt(),
                "messages", conversation.getMessages().stream().map(message -> Map.of(
                        "id", message.getId(),
                        "senderName", message.getSenderName(),
                        "senderRole", message.getSenderRole(),
                        "message", message.getMessage(),
                        "createdAt", message.getCreatedAt(),
                        "isOwn", message.getSenderUser() != null && message.getSenderUser().getId().equals(conversation.getUser().getId())
                )).toList()
        );
    }

    private String roleLabel(User user) {
        return user.getRole() == Role.ADMIN ? "admin" : "user";
    }
}
