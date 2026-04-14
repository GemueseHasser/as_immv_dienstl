package de.asimmobilien.model;

import jakarta.persistence.*;

@Entity
@Table(name = "apartment_images")
public class ApartmentImage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id", nullable = false)
    private Apartment apartment;
    @Column(name = "image_url", nullable = false)
    private String imageUrl;
    @Column(name = "sort_order", nullable = false)
    private int sortOrder;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Apartment getApartment() { return apartment; }
    public void setApartment(Apartment apartment) { this.apartment = apartment; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
