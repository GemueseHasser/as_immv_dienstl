package de.asimmobilien.service;

import de.asimmobilien.config.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);
    private final JavaMailSender mailSender;
    private final AppProperties properties;

    public MailService(JavaMailSender mailSender, AppProperties properties) {
        this.mailSender = mailSender;
        this.properties = properties;
    }

    public void send(String subject, String text) {
        if (!StringUtils.hasText(properties.getContactReceiverEmail()) || !StringUtils.hasText(properties.getMailFrom())) {
            log.warn("Mail-Konfiguration unvollständig; E-Mail wird nicht versendet. Betreff: {}", subject);
            return;
        }
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setFrom(properties.getMailFrom());
            msg.setTo(properties.getContactReceiverEmail());
            msg.setSubject(subject);
            msg.setText(text);
            mailSender.send(msg);
        } catch (Exception ex) {
            log.warn("E-Mail konnte nicht versendet werden: {}", ex.getMessage());
        }
    }
}
