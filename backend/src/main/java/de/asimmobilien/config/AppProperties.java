package de.asimmobilien.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String jwtSecret;
    private long jwtExpirationHours = 72;
    private String uploadDir;
    private String publicUploadPrefix;
    private String mailFrom;
    private String contactReceiverEmail;
    private String adminName;
    private String adminEmail;
    private String adminPassword;

    public String getJwtSecret() { return jwtSecret; }
    public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }
    public long getJwtExpirationHours() { return jwtExpirationHours; }
    public void setJwtExpirationHours(long jwtExpirationHours) { this.jwtExpirationHours = jwtExpirationHours; }
    public String getUploadDir() { return uploadDir; }
    public void setUploadDir(String uploadDir) { this.uploadDir = uploadDir; }
    public String getPublicUploadPrefix() { return publicUploadPrefix; }
    public void setPublicUploadPrefix(String publicUploadPrefix) { this.publicUploadPrefix = publicUploadPrefix; }
    public String getMailFrom() { return mailFrom; }
    public void setMailFrom(String mailFrom) { this.mailFrom = mailFrom; }
    public String getContactReceiverEmail() { return contactReceiverEmail; }
    public void setContactReceiverEmail(String contactReceiverEmail) { this.contactReceiverEmail = contactReceiverEmail; }
    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }
    public String getAdminEmail() { return adminEmail; }
    public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }
    public String getAdminPassword() { return adminPassword; }
    public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }
}
