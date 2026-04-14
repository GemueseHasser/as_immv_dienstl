package de.asimmobilien.repository;

import de.asimmobilien.model.Apartment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    @EntityGraph(attributePaths = "images")
    List<Apartment> findByIsPublishedTrueOrderByCreatedAtDesc();
    @EntityGraph(attributePaths = "images")
    List<Apartment> findAllByOrderByCreatedAtDesc();
    @EntityGraph(attributePaths = "images")
    Optional<Apartment> findBySlug(String slug);
    @Override
    @EntityGraph(attributePaths = "images")
    Optional<Apartment> findById(Long id);
}
