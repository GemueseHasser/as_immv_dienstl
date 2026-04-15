package de.asimmobilien.service;

import de.asimmobilien.dto.ApartmentAdminRequest;
import de.asimmobilien.model.Apartment;
import de.asimmobilien.model.ApartmentImage;
import de.asimmobilien.model.ApartmentMessage;
import de.asimmobilien.model.ChatConversation;
import de.asimmobilien.model.User;
import de.asimmobilien.repository.ApartmentMessageRepository;
import de.asimmobilien.repository.ApartmentRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ApartmentService {
    private final ApartmentRepository apartmentRepository;
    private final ApartmentMessageRepository messageRepository;
    private final SlugService slugService;
    private final ChatService chatService;

    public ApartmentService(ApartmentRepository apartmentRepository, ApartmentMessageRepository messageRepository, SlugService slugService, ChatService chatService) {
        this.apartmentRepository = apartmentRepository;
        this.messageRepository = messageRepository;
        this.slugService = slugService;
        this.chatService = chatService;
    }

    public List<Apartment> list(boolean includeDrafts) {
        return includeDrafts ? apartmentRepository.findAllByOrderByCreatedAtDesc() : apartmentRepository.findByIsPublishedTrueOrderByCreatedAtDesc();
    }

    public Apartment getPublishedBySlug(String slug) {
        Apartment apartment = apartmentRepository.findBySlug(slug).orElseThrow(() -> new IllegalArgumentException("Wohnung nicht gefunden."));
        if (!apartment.isPublished()) throw new IllegalArgumentException("Wohnung nicht gefunden.");
        return apartment;
    }

    public Apartment getAdminById(Long id) {
        return apartmentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Wohnung nicht gefunden."));
    }

    @Transactional
    public Apartment save(Apartment apartment, ApartmentAdminRequest request) {
        apartment.setTitle(request.getTitle());
        apartment.setShortDescription(request.getShortDescription());
        apartment.setFullDescription(request.getFullDescription());
        apartment.setExchangeUrl(request.getExchangeUrl());
        apartment.setPublished(request.isPublished());
        apartment.setSlug(slugService.toUniqueSlug(request.getTitle(), apartment.getId()));
        List<String> imageUrls = request.getImages() == null ? List.of() : request.getImages().stream().filter(StringUtils::hasText).toList();
        String titleImage = StringUtils.hasText(request.getTitleImage()) ? request.getTitleImage() : (imageUrls.isEmpty() ? "" : imageUrls.getFirst());
        apartment.setTitleImage(titleImage);
        apartment.getImages().clear();
        List<ApartmentImage> newImages = new ArrayList<>();
        for (int i = 0; i < imageUrls.size(); i++) {
            ApartmentImage image = new ApartmentImage();
            image.setApartment(apartment);
            image.setImageUrl(imageUrls.get(i));
            image.setSortOrder(i);
            newImages.add(image);
        }
        apartment.getImages().addAll(newImages);
        return apartmentRepository.save(apartment);
    }

    @Transactional
    public void delete(Long id) { apartmentRepository.deleteById(id); }

    public List<ApartmentMessage> messages(Long apartmentId) { return messageRepository.findByApartmentIdOrderByCreatedAtDesc(apartmentId); }

    public ChatConversation addMessage(Apartment apartment, User user, String message) {
        ApartmentMessage entity = new ApartmentMessage();
        entity.setApartment(apartment);
        entity.setUser(user);
        entity.setMessage(message.trim());
        messageRepository.save(entity);
        return chatService.createApartmentConversation(apartment, user, message.trim());
    }
}
