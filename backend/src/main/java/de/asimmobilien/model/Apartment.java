package de.asimmobilien.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "apartments")
public class Apartment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String slug;
    @Column(nullable = false)
    private String title;
    @Column(name = "short_description", nullable = false, columnDefinition = "TEXT")
    private String shortDescription;
    @Column(name = "full_description", columnDefinition = "LONGTEXT")
    private String fullDescription;
    @Column(name = "title_image", nullable = false)
    private String titleImage;
    @Column(name = "exchange_url")
    private String exchangeUrl;
    @Column(name = "is_published", nullable = false)
    private boolean isPublished = true;
    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime createdAt;
    @Column(name = "updated_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime updatedAt;
    @OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sortOrder ASC, id ASC")
    private List<ApartmentImage> images = new ArrayList<>();
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getTitleImage() { return titleImage; }
    public void setTitleImage(String titleImage) { this.titleImage = titleImage; }
    public String getExchangeUrl() { return exchangeUrl; }
    public void setExchangeUrl(String exchangeUrl) { this.exchangeUrl = exchangeUrl; }
    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }
    public List<ApartmentImage> getImages() { return images; }
    public void setImages(List<ApartmentImage> images) { this.images = images; }
}
