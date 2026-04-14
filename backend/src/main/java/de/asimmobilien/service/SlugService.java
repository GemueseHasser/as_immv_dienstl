package de.asimmobilien.service;

import de.asimmobilien.repository.ApartmentRepository;
import java.text.Normalizer;
import java.util.Locale;
import org.springframework.stereotype.Service;

@Service
public class SlugService {
    private final ApartmentRepository apartmentRepository;
    public SlugService(ApartmentRepository apartmentRepository) { this.apartmentRepository = apartmentRepository; }
    public String toUniqueSlug(String input, Long currentId) {
        String base = Normalizer.normalize(input == null ? "wohnung" : input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        if (base.isBlank()) base = "wohnung";
        String candidate = base;
        int index = 2;
        while (true) {
            var found = apartmentRepository.findBySlug(candidate);
            if (found.isEmpty() || found.get().getId().equals(currentId)) return candidate;
            candidate = base + "-" + index++;
        }
    }
}
