package de.asimmobilien.service;

import de.asimmobilien.config.AppProperties;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadService {
    private final AppProperties properties;
    public UploadService(AppProperties properties) { this.properties = properties; }

    public List<String> saveImages(List<MultipartFile> files) throws IOException {
        Path apartmentDir = Path.of(properties.getUploadDir(), "apartments").toAbsolutePath().normalize();
        Files.createDirectories(apartmentDir);
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;
            String clean = Normalizer.normalize(file.getOriginalFilename() == null ? "bild" : file.getOriginalFilename(), Normalizer.Form.NFD)
                    .replaceAll("\\p{M}", "")
                    .toLowerCase(Locale.ROOT)
                    .replaceAll("[^a-z0-9.\\-]+", "-");
            String filename = UUID.randomUUID() + "-" + clean;
            Path target = apartmentDir.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            urls.add(properties.getPublicUploadPrefix() + "/apartments/" + filename);
        }
        return urls;
    }
}
