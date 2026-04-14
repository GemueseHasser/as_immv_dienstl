package de.asimmobilien.dto;

import java.util.List;

public class ApartmentAdminRequest {
    private Long id;
    private String title;
    private String shortDescription;
    private String fullDescription;
    private String exchangeUrl;
    private String titleImage;
    private boolean isPublished = true;
    private List<String> images;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getExchangeUrl() { return exchangeUrl; }
    public void setExchangeUrl(String exchangeUrl) { this.exchangeUrl = exchangeUrl; }
    public String getTitleImage() { return titleImage; }
    public void setTitleImage(String titleImage) { this.titleImage = titleImage; }
    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
}
