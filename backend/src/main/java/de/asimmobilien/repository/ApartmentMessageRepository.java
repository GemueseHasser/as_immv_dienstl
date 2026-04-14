package de.asimmobilien.repository;

import de.asimmobilien.model.ApartmentMessage;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentMessageRepository extends JpaRepository<ApartmentMessage, Long> {
    @EntityGraph(attributePaths = {"user"})
    List<ApartmentMessage> findByApartmentIdOrderByCreatedAtDesc(Long apartmentId);
}
