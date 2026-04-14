package de.asimmobilien.controller;

import de.asimmobilien.dto.ApartmentAdminRequest;
import de.asimmobilien.dto.ApartmentResponse;
import de.asimmobilien.model.Apartment;
import de.asimmobilien.service.ApartmentService;
import de.asimmobilien.service.UploadService;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
public class AdminApartmentController {
    private final ApartmentService apartmentService;
    private final UploadService uploadService;
    public AdminApartmentController(ApartmentService apartmentService, UploadService uploadService) {
        this.apartmentService = apartmentService;
        this.uploadService = uploadService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, Object> upload(@RequestPart("images") List<MultipartFile> images) throws IOException {
        List<String> urls = uploadService.saveImages(images);
        return Map.of("ok", true, "files", urls.stream().map(url -> Map.of("url", url)).toList());
    }

    @GetMapping("/apartments/{id}")
    public Map<String, Object> get(@PathVariable Long id) {
        return Map.of("ok", true, "apartment", ApartmentResponse.summary(apartmentService.getAdminById(id)));
    }

    @PostMapping("/apartments")
    public Map<String, Object> create(@RequestBody ApartmentAdminRequest request) {
        Apartment apartment = apartmentService.save(new Apartment(), request);
        return Map.of("ok", true, "apartment", ApartmentResponse.summary(apartment));
    }

    @PutMapping("/apartments/{id}")
    public Map<String, Object> update(@PathVariable Long id, @RequestBody ApartmentAdminRequest request) {
        Apartment apartment = apartmentService.getAdminById(id);
        request.setId(id);
        apartment = apartmentService.save(apartment, request);
        return Map.of("ok", true, "apartment", ApartmentResponse.summary(apartment));
    }

    @DeleteMapping("/apartments/{id}")
    public Map<String, Object> delete(@PathVariable Long id) {
        apartmentService.delete(id);
        return Map.of("ok", true);
    }
}
