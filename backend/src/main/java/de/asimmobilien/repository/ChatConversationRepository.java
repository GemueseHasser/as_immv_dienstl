package de.asimmobilien.repository;

import de.asimmobilien.model.ChatCategory;
import de.asimmobilien.model.ChatConversation;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatConversationRepository extends JpaRepository<ChatConversation, Long> {
    @EntityGraph(attributePaths = {"user", "apartment", "messages", "messages.senderUser"})
    List<ChatConversation> findByUserIdOrderByUpdatedAtDesc(Long userId);

    @EntityGraph(attributePaths = {"user", "apartment", "messages", "messages.senderUser"})
    List<ChatConversation> findByCategoryOrderByUpdatedAtDesc(ChatCategory category);

    @Override
    @EntityGraph(attributePaths = {"user", "apartment", "messages", "messages.senderUser"})
    Optional<ChatConversation> findById(Long id);
}
