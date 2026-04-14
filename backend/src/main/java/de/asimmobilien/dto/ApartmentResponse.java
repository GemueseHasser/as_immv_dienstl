package de.asimmobilien.dto;

import de.asimmobilien.model.Apartment;
import de.asimmobilien.model.ApartmentImage;
import java.util.HashMap;
import java.util.Map;

public class ApartmentResponse {
    public static Map<String, Object> summary(Apartment apartment) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", apartment.getId());
        map.put("slug", apartment.getSlug());
        map.put("title", apartment.getTitle());
        map.put("shortDescription", apartment.getShortDescription());
        map.put("fullDescription", apartment.getFullDescription());
        map.put("titleImage", apartment.getTitleImage());
        map.put("exchangeUrl", apartment.getExchangeUrl());
        map.put("isPublished", apartment.isPublished());
        map.put("images", apartment.getImages().stream().map(ApartmentResponse::image).toList());
        return map;
    }

    public static Map<String, Object> image(ApartmentImage img) {
        return Map.of("id", img.getId(), "imageUrl", img.getImageUrl(), "sortOrder", img.getSortOrder());
    }

    public static Map<String, Object> message(Long id, String name, String message, Object createdAt) {
        return Map.of("id", id, "name", name, "message", message, "created_at", createdAt);
    }
}
