package de.asimmobilien.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String jwtSecret;
    private long jwtExpirationHours = 72;
    private String uploadDir;
    private String publicUploadPrefix;
    private String publicBaseUrl;
    private String mailAssetBaseUrl;
    private String mailFrom;
    private String mailFromName;
    private String contactReceiverEmail;
    private String immvReceiverEmail;
    private String dienstlReceiverEmail;

    public String getJwtSecret() { return jwtSecret; }
    public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }
    public long getJwtExpirationHours() { return jwtExpirationHours; }
    public void setJwtExpirationHours(long jwtExpirationHours) { this.jwtExpirationHours = jwtExpirationHours; }
    public String getUploadDir() { return uploadDir; }
    public void setUploadDir(String uploadDir) { this.uploadDir = uploadDir; }
    public String getPublicUploadPrefix() { return publicUploadPrefix; }
    public void setPublicUploadPrefix(String publicUploadPrefix) { this.publicUploadPrefix = publicUploadPrefix; }
    public String getPublicBaseUrl() { return publicBaseUrl; }
    public void setPublicBaseUrl(String publicBaseUrl) { this.publicBaseUrl = publicBaseUrl; }
    public String getMailAssetBaseUrl() { return mailAssetBaseUrl; }
    public void setMailAssetBaseUrl(String mailAssetBaseUrl) { this.mailAssetBaseUrl = mailAssetBaseUrl; }
    public String getMailFrom() { return mailFrom; }
    public void setMailFrom(String mailFrom) { this.mailFrom = mailFrom; }
    public String getMailFromName() { return mailFromName; }
    public void setMailFromName(String mailFromName) { this.mailFromName = mailFromName; }
    public String getContactReceiverEmail() { return contactReceiverEmail; }
    public void setContactReceiverEmail(String contactReceiverEmail) { this.contactReceiverEmail = contactReceiverEmail; }
    public String getImmvReceiverEmail() { return immvReceiverEmail; }
    public void setImmvReceiverEmail(String immvReceiverEmail) { this.immvReceiverEmail = immvReceiverEmail; }
    public String getDienstlReceiverEmail() { return dienstlReceiverEmail; }
    public void setDienstlReceiverEmail(String dienstlReceiverEmail) { this.dienstlReceiverEmail = dienstlReceiverEmail; }
}
