package de.asimmobilien.service;

import de.asimmobilien.config.AppProperties;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.HtmlUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.mail.internet.InternetAddress;

@Service
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);
    private static final String LOGO_IMMOBILIEN_CID = "logo-immobilien";
    private static final String LOGO_DIENSTLEISTUNGEN_CID = "logo-dienstleistungen";
    private static final Pattern EMAIL_IN_ANGLE_BRACKETS = Pattern.compile("<([^>]+)>");

    private final JavaMailSender mailSender;
    private final AppProperties properties;

    public MailService(JavaMailSender mailSender, AppProperties properties) {
        this.mailSender = mailSender;
        this.properties = properties;
    }

    public void send(String subject, String text) {
        sendTo(resolveImmvRecipient(), subject, text);
    }

    public void sendTo(String recipient, String subject, String text) {
        sendEmail(recipient, subject, text, buildSimpleTextHtml(subject, text));
    }

    public void sendVerificationEmail(String recipient, String name, String verificationUrl) {
        String subject = "Bitte bestätigen Sie Ihre E-Mail-Adresse";
        String preview = "Bestätigen Sie Ihr Konto bei AS Immobilienverwaltung & Dienstleistungen.";
        String plainText = "Hallo " + safeText(name) + ",\n\n"
                + "bitte bestätigen Sie Ihre E-Mail-Adresse für Ihr Konto bei AS Immobilienverwaltung & Dienstleistungen:\n"
                + verificationUrl + "\n\n"
                + "Der Link ist 24 Stunden gültig.";
        String html = buildBrandedHtml(
                preview,
                "E-Mail-Adresse bestätigen",
                "Willkommen bei AS Immobilienverwaltung & Dienstleistungen. Bitte bestätigen Sie Ihr Konto mit einem Klick auf den Button.",
                List.of(
                        infoRow("Empfänger", safeText(name) + " · " + safeText(recipient)),
                        infoRow("Gültigkeit", "24 Stunden"),
                        infoRow("Aktion", "E-Mail-Adresse bestätigen")
                ),
                "E-Mail bestätigen",
                verificationUrl,
                "Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:",
                verificationUrl,
                null,
                "Nach der Bestätigung können Sie sich direkt mit Ihrem neuen Konto anmelden."
        );
        sendEmail(recipient, subject, plainText, html);
    }

    public void sendResetPasswordEmail(String recipient, String name, String resetUrl) {
        String subject = "Passwort zurücksetzen";
        String preview = "Setzen Sie Ihr Passwort sicher zurück.";
        String plainText = "Hallo " + safeText(name) + ",\n\n"
                + "über den folgenden Link können Sie Ihr Passwort für AS Immobilienverwaltung & Dienstleistungen zurücksetzen:\n"
                + resetUrl + "\n\n"
                + "Der Link ist 2 Stunden gültig.";
        String html = buildBrandedHtml(
                preview,
                "Passwort zurücksetzen",
                "Sie haben eine Zurücksetzung Ihres Passworts angefordert. Über den folgenden Button können Sie ein neues Passwort vergeben.",
                List.of(
                        infoRow("Empfänger", safeText(name) + " · " + safeText(recipient)),
                        infoRow("Gültigkeit", "2 Stunden"),
                        infoRow("Sicherheit", "Dieser Link kann nur einmal verwendet werden")
                ),
                "Neues Passwort vergeben",
                resetUrl,
                "Falls der Button nicht funktioniert, kopieren Sie diesen Link in Ihren Browser:",
                resetUrl,
                null,
                "Wenn Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren. Ihr aktuelles Passwort bleibt dann unverändert."
        );
        sendEmail(recipient, subject, plainText, html);
    }


    public void sendAdminNotificationForChat(de.asimmobilien.model.ChatConversation conversation, de.asimmobilien.model.ChatMessage chatMessage) {
        String recipient = conversation.getCategory() == de.asimmobilien.model.ChatCategory.DIENSTLEISTUNGEN
                ? resolveDienstlRecipient()
                : resolveImmvRecipient();
        String subject = "Neue Nachricht über die Website: " + safeText(conversation.getSubject());
        String chatUrl = buildAdminChatUrl(conversation);
        String plainText = "Es ist eine neue Nachricht über die Website eingegangen.\n\n"
                + "Thema: " + safeText(conversation.getSubject()) + "\n"
                + (StringUtils.hasText(conversation.getServiceLabel()) ? "Leistung: " + safeText(conversation.getServiceLabel()) + "\n" : "")
                + (conversation.getApartment() != null ? "Wohnung: " + safeText(conversation.getApartment().getTitle()) + "\n" : "")
                + "Von: " + safeText(conversation.getUser().getName()) + " <" + safeText(conversation.getUser().getEmail()) + ">\n\n"
                + safeText(chatMessage.getMessage())
                + "\n\nBitte antworten Sie über die Chat-Funktion auf der Webseite:\n" + chatUrl;
        String html = buildBrandedHtml(
                "Neue Nachricht über die Website eingegangen.",
                "Neue Anfrage auf der Webseite",
                "Es ist eine neue Nachricht eingegangen. Bitte antworten Sie direkt über die Chat-Funktion auf der Webseite.",
                java.util.List.of(
                        infoRow("Thema", safeText(conversation.getSubject())),
                        infoRow("Absender", safeText(conversation.getUser().getName())),
                        infoRow("E-Mail", safeText(conversation.getUser().getEmail()))
                ),
                "Chat im Admin-Bereich öffnen",
                chatUrl,
                null,
                null,
                messageCard(chatMessage.getMessage()),
                "Antworten Sie nicht per E-Mail, sondern direkt über die Chat-Funktion auf der Webseite."
        );
        sendEmail(recipient, subject, plainText, html);
    }

    public void sendUserNotificationForChat(de.asimmobilien.model.ChatConversation conversation, de.asimmobilien.model.ChatMessage chatMessage) {
        String subject = "Neue Nachricht von AS Immobilienverwaltung & Dienstleistungen";
        String chatUrl = buildUserChatUrl(conversation);
        String plainText = "Hallo " + safeText(conversation.getUser().getName()) + ",\n\n"
                + "Sie haben eine neue Nachricht von AS Immobilienverwaltung & Dienstleistungen erhalten.\n\n"
                + "Thema: " + safeText(conversation.getSubject()) + "\n\n"
                + safeText(chatMessage.getMessage())
                + "\n\nBitte antworten Sie über die Chat-Funktion auf der Webseite:\n" + chatUrl;
        String html = buildBrandedHtml(
                "Neue Nachricht von AS Immobilienverwaltung & Dienstleistungen.",
                "Neue Nachricht erhalten",
                "Sie haben eine neue Nachricht von AS Immobilienverwaltung & Dienstleistungen erhalten. Bitte antworten Sie direkt über die Chat-Funktion auf der Webseite.",
                java.util.List.of(
                        infoRow("Thema", safeText(conversation.getSubject())),
                        infoRow("Bereich", conversation.getCategory() == de.asimmobilien.model.ChatCategory.DIENSTLEISTUNGEN ? "Dienstleistungen" : "Immobilienverwaltung")
                ),
                "Chat öffnen",
                chatUrl,
                null,
                null,
                messageCard(chatMessage.getMessage()),
                "Antworten Sie nicht per E-Mail, sondern direkt über die Chat-Funktion auf der Webseite."
        );
        sendEmail(conversation.getUser().getEmail(), subject, plainText, html);
    }

    public void sendContactRequestEmail(String requestType, String service, String senderEmail, String senderName, String message) {
        String subject = "Neue Kontaktanfrage: " + safeText(requestType);
        String plainText = "Typ: " + safeText(requestType) + "\n"
                + "Service: " + safeText(service) + "\n"
                + "E-Mail: " + safeText(senderEmail) + "\n"
                + "Name: " + safeText(senderName) + "\n\n"
                + safeText(message);
        List<String> infoRows = new ArrayList<>();
        infoRows.add(infoRow("Anfrageart", safeText(requestType)));
        if (StringUtils.hasText(service)) {
            infoRows.add(infoRow("Leistung", safeText(service)));
        }
        infoRows.add(infoRow("Absender", safeText(senderName)));
        infoRows.add(infoRow("E-Mail", safeText(senderEmail)));

        String html = buildBrandedHtml(
                "Neue Anfrage über die Website eingegangen.",
                "Neue Anfrage eingegangen",
                "Über die Website wurde eine neue Anfrage für AS Immobilienverwaltung & Dienstleistungen eingereicht.",
                infoRows,
                "Direkt antworten",
                buildReplyMailto(senderEmail),
                null,
                null,
                messageCard(message),
                null
        );
        sendEmail(resolveContactRecipient(requestType), subject, plainText, html);
    }

    public void sendApartmentInquiryEmail(String apartmentTitle, String apartmentSlug, String senderEmail, String senderName, String message) {
        String subject = "Neue Kontaktanfrage zur Wohnungsanzeige: " + safeText(apartmentTitle);
        String plainText = "Typ: Immobilienverwaltung / Wohnungsanzeige\n"
                + "Wohnung: " + safeText(apartmentTitle) + "\n"
                + "E-Mail: " + safeText(senderEmail) + "\n"
                + "Name: " + safeText(senderName) + "\n\n"
                + safeText(message);
        String apartmentUrl = null;
        if (StringUtils.hasText(apartmentSlug)) {
            apartmentUrl = resolvePublicBaseUrl() + "/#/immobilienverwaltung/wohnungen/" + apartmentSlug;
        }
        String html = buildBrandedHtml(
                "Neue Wohnungsanfrage über die Website eingegangen.",
                "Neue Anfrage zu einer Wohnung",
                "Es wurde eine neue Kontaktanfrage zu einer veröffentlichten Wohnungsanzeige übermittelt.",
                List.of(
                        infoRow("Bereich", "Immobilienverwaltung / Wohnungsanzeige"),
                        infoRow("Wohnung", safeText(apartmentTitle)),
                        infoRow("Absender", safeText(senderName)),
                        infoRow("E-Mail", safeText(senderEmail))
                ),
                "Direkt antworten",
                buildReplyMailto(senderEmail),
                apartmentUrl != null ? "Wohnungsanzeige öffnen" : null,
                apartmentUrl,
                messageCard(message),
                null
        );
        sendEmail(resolveImmvRecipient(), subject, plainText, html);
    }


    private String resolveContactRecipient(String requestType) {
        String normalized = requestType == null ? "" : requestType.trim().toLowerCase();
        if (normalized.contains("dienst")) {
            return resolveDienstlRecipient();
        }
        return resolveImmvRecipient();
    }

    private String resolveImmvRecipient() {
        if (StringUtils.hasText(properties.getImmvReceiverEmail())) {
            return properties.getImmvReceiverEmail();
        }
        return properties.getContactReceiverEmail();
    }

    private String resolveDienstlRecipient() {
        if (StringUtils.hasText(properties.getDienstlReceiverEmail())) {
            return properties.getDienstlReceiverEmail();
        }
        return properties.getContactReceiverEmail();
    }

    private void sendEmail(String recipient, String subject, String text, String html) {
        if (!StringUtils.hasText(recipient) || !StringUtils.hasText(properties.getMailFrom())) {
            log.warn("Mail-Konfiguration unvollständig; E-Mail wird nicht versendet. Betreff: {}", subject);
            return;
        }
        try {
            var mimeMessage = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            helper.setFrom(buildFromAddress());
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(text, html);
            helper.addInline(LOGO_IMMOBILIEN_CID, new ClassPathResource("mail-assets/as-immobilienverwaltung-schwarz.png"), "image/png");
            helper.addInline(LOGO_DIENSTLEISTUNGEN_CID, new ClassPathResource("mail-assets/as-dienstleistungen-schwarz.png"), "image/png");
            mailSender.send(mimeMessage);
        } catch (Exception ex) {
            log.warn("E-Mail konnte nicht versendet werden: {}", ex.getMessage());
        }
    }

    private String buildSimpleTextHtml(String title, String text) {
        String escapedText = HtmlUtils.htmlEscape(text == null ? "" : text).replace("\n", "<br>");
        return buildBrandedHtml(
                title,
                title,
                null,
                List.of(),
                null,
                null,
                null,
                null,
                "<div style=\"font-size:15px; line-height:1.7; color:#1f2937;\">" + escapedText + "</div>",
                null
        );
    }

    private String buildBrandedHtml(String previewText,
                                    String headline,
                                    String intro,
                                    List<String> infoRows,
                                    String buttonLabel,
                                    String buttonUrl,
                                    String secondaryLabel,
                                    String secondaryUrl,
                                    String customBodyHtml,
                                    String footerNote) {
        String logos = "<div style=\"text-align:center; margin-bottom:28px;\">"
                + "<img src=\"cid:" + LOGO_IMMOBILIEN_CID + "\" alt=\"AS Immobilienverwaltung\" style=\"display:block; margin:0 auto 10px auto; max-width:260px; width:100%; height:auto;\">"
                + "<img src=\"cid:" + LOGO_DIENSTLEISTUNGEN_CID + "\" alt=\"AS Dienstleistungen\" style=\"display:block; margin:0 auto; max-width:220px; width:100%; height:auto;\">"
                + "</div>";

        StringBuilder infoHtml = new StringBuilder();
        if (infoRows != null && !infoRows.isEmpty()) {
            infoHtml.append("<div style=\"background:#f8fafc; border:1px solid #e5e7eb; border-radius:18px; padding:18px 20px; margin:24px 0;\">");
            for (String row : infoRows) {
                infoHtml.append(row);
            }
            infoHtml.append("</div>");
        }

        String primaryButtonHtml = "";
        if (StringUtils.hasText(buttonLabel) && StringUtils.hasText(buttonUrl)) {
            primaryButtonHtml = "<div style=\"text-align:center; margin:28px 0 18px;\">"
                    + "<a href=\"" + HtmlUtils.htmlEscape(buttonUrl) + "\" style=\"display:inline-block; background:#111827; color:#ffffff; text-decoration:none; padding:14px 24px; border-radius:999px; font-weight:700; font-size:15px;\">"
                    + HtmlUtils.htmlEscape(buttonLabel)
                    + "</a></div>";
        }

        String secondaryLinkHtml = "";
        if (StringUtils.hasText(secondaryLabel) && StringUtils.hasText(secondaryUrl)) {
            secondaryLinkHtml = "<div style=\"text-align:center; margin:12px 0 18px;\">"
                    + "<a href=\"" + HtmlUtils.htmlEscape(secondaryUrl) + "\" style=\"display:inline-block; background:#ffffff; color:#111827; text-decoration:none; padding:14px 24px; border-radius:999px; font-weight:700; font-size:15px; border:1px solid #d1d5db;\">"
                    + HtmlUtils.htmlEscape(secondaryLabel)
                    + "</a></div>"
                    + "<div style=\"margin-top:12px; color:#4b5563; font-size:13px; line-height:1.7; text-align:center; word-break:break-all;\">"
                    + "<a href=\"" + HtmlUtils.htmlEscape(secondaryUrl) + "\" style=\"color:#4b5563;\">" + HtmlUtils.htmlEscape(secondaryUrl) + "</a></div>";
        }

                String introHtml = StringUtils.hasText(intro)
                ? "<p style=\"margin:0 0 18px; color:#4b5563; font-size:16px; line-height:1.7;\">" + HtmlUtils.htmlEscape(intro) + "</p>"
                : "";

        String bodyHtml = StringUtils.hasText(customBodyHtml) ? customBodyHtml : "";
        String footerHtml = StringUtils.hasText(footerNote)
                ? "<p style=\"margin:28px 0 0; color:#6b7280; font-size:13px; line-height:1.7;\">" + HtmlUtils.htmlEscape(footerNote) + "</p>"
                : "";

        return "<!doctype html><html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>"
                + HtmlUtils.htmlEscape(headline)
                + "</title></head><body style=\"margin:0; padding:0; background:#f3f4f6; font-family:Arial, Helvetica, sans-serif; color:#111827;\">"
                + "<div style=\"display:none; max-height:0; overflow:hidden; opacity:0;\">" + HtmlUtils.htmlEscape(previewText == null ? "" : previewText) + "</div>"
                + "<table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"background:#f3f4f6; padding:24px 12px;\"><tr><td align=\"center\">"
                + "<table role=\"presentation\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" style=\"max-width:680px; background:#ffffff; border-radius:28px; overflow:hidden; box-shadow:0 18px 55px rgba(15,23,42,0.12);\">"
                + "<tr><td style=\"padding:34px 26px 18px; background:linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);\">"
                + logos
                + "<div style=\"border-top:1px solid #e5e7eb; padding-top:28px;\">"
                + "<div style=\"font-size:30px; line-height:1.2; font-weight:800; letter-spacing:-0.02em; margin:0 0 14px; color:#111827;\">" + HtmlUtils.htmlEscape(headline) + "</div>"
                + introHtml
                + infoHtml
                + bodyHtml
                + primaryButtonHtml
                + secondaryLinkHtml
                + footerHtml
                + "</div></td></tr>"
                + "<tr><td style=\"padding:18px 26px 30px; color:#9ca3af; font-size:12px; text-align:center;\">AS Immobilienverwaltung &amp; Dienstleistungen</td></tr>"
                + "</table></td></tr></table></body></html>";
    }

    private String messageCard(String message) {
        return "<div style=\"margin-top:20px; background:#111827; color:#ffffff; border-radius:18px; padding:20px 22px;\">"
                + "<div style=\"font-size:15px; line-height:1.8; white-space:pre-wrap;\">"
                + HtmlUtils.htmlEscape(safeText(message))
                + "</div></div>";
    }

    private String infoRow(String label, String value) {
        return "<div style=\"display:block; padding:10px 0; border-bottom:1px solid #e5e7eb;\">"
                + "<div style=\"font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:#6b7280; margin-bottom:4px;\">"
                + HtmlUtils.htmlEscape(label)
                + "</div><div style=\"font-size:15px; color:#111827; line-height:1.6;\">"
                + HtmlUtils.htmlEscape(safeText(value))
                + "</div></div>";
    }


    private String buildReplyMailto(String senderEmail) {
        String email = trimToNull(senderEmail);
        if (email == null) {
            return null;
        }
        return "mailto:" + email;
    }


    private InternetAddress buildFromAddress() throws Exception {
        String configuredFrom = trimToNull(properties.getMailFrom());
        if (configuredFrom == null) {
            throw new IllegalStateException("MAIL_FROM ist nicht konfiguriert");
        }

        String email = extractEmailAddress(configuredFrom);
        String displayName = trimToNull(properties.getMailFromName());
        if (displayName == null) {
            displayName = "AS Immobilienverwaltung & Dienstleistungen";
        }
        return new InternetAddress(email, displayName, StandardCharsets.UTF_8.name());
    }

    private String extractEmailAddress(String configuredFrom) {
        Matcher matcher = EMAIL_IN_ANGLE_BRACKETS.matcher(configuredFrom);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return configuredFrom.trim();
    }


    private String buildUserChatUrl(de.asimmobilien.model.ChatConversation conversation) {
        return resolvePublicBaseUrl() + "/#/konto/nachrichten/" + conversation.getId();
    }

    private String buildAdminChatUrl(de.asimmobilien.model.ChatConversation conversation) {
        String category = conversation.getCategory() == de.asimmobilien.model.ChatCategory.DIENSTLEISTUNGEN ? "dienstleistungen" : "immobilienverwaltung";
        return resolvePublicBaseUrl() + "/#/admin/chats?category=" + category + "&chat=" + conversation.getId();
    }

    private String resolvePublicBaseUrl() {
        String requestBaseUrl = resolveCurrentRequestBaseUrl();
        if (StringUtils.hasText(requestBaseUrl)) {
            return requestBaseUrl;
        }
        if (StringUtils.hasText(properties.getPublicBaseUrl())) {
            return properties.getPublicBaseUrl().replaceAll("/+$", "");
        }
        return "http://localhost";
    }

    private String resolveCurrentRequestBaseUrl() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (!(attributes instanceof ServletRequestAttributes servletAttributes)) {
            return null;
        }
        HttpServletRequest request = servletAttributes.getRequest();
        String forwardedProto = trimToNull(request.getHeader("X-Forwarded-Proto"));
        String forwardedHost = trimToNull(request.getHeader("X-Forwarded-Host"));
        String forwardedPort = trimToNull(request.getHeader("X-Forwarded-Port"));

        String scheme = forwardedProto != null ? forwardedProto : request.getScheme();
        String hostHeader = forwardedHost != null ? forwardedHost : request.getHeader("Host");
        if (!StringUtils.hasText(hostHeader)) {
            hostHeader = request.getServerName();
            int serverPort = request.getServerPort();
            if (serverPort > 0 && !isDefaultPort(scheme, serverPort)) {
                hostHeader = hostHeader + ":" + serverPort;
            }
        }

        if (!StringUtils.hasText(hostHeader)) {
            return null;
        }

        if (StringUtils.hasText(forwardedPort) && !hostHeader.contains(":")) {
            int port = safeParsePort(forwardedPort);
            if (port > 0 && !isDefaultPort(scheme, port)) {
                hostHeader = hostHeader + ":" + port;
            }
        }

        return scheme + "://" + hostHeader.replaceAll("/+$", "");
    }

    private boolean isDefaultPort(String scheme, int port) {
        return ("http".equalsIgnoreCase(scheme) && port == 80)
                || ("https".equalsIgnoreCase(scheme) && port == 443);
    }

    private int safeParsePort(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            return -1;
        }
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        String normalized = value.split(",")[0].trim();
        return normalized.isEmpty() ? null : normalized;
    }

    private String safeText(String value) {
        return value == null ? "" : value;
    }
}
