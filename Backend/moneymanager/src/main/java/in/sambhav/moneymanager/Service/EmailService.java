package in.sambhav.moneymanager.Service;

import in.sambhav.moneymanager.DTO.BrevoEmailRequestDTO;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import java.io.ByteArrayInputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${brevo.api.key}")
    private String apiKey;

    @Value("${brevo.sender.email}")
    private String senderEmail;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendEmail(String to, String subject, String body) {

        try {

            BrevoEmailRequestDTO request =
                    new BrevoEmailRequestDTO();

            BrevoEmailRequestDTO.Sender sender =
                    new BrevoEmailRequestDTO.Sender();

            sender.setEmail(senderEmail);
            sender.setName("FinTrack");

            request.setSender(sender);

            BrevoEmailRequestDTO.Recipient recipient =
                    new BrevoEmailRequestDTO.Recipient();

            recipient.setEmail(to);

            request.setTo(List.of(recipient));

            request.setSubject(subject);

            request.setHtmlContent(body);

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_JSON);

            headers.set("api-key", apiKey);

            HttpEntity<BrevoEmailRequestDTO> entity =
                    new HttpEntity<>(request, headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            "https://api.brevo.com/v3/smtp/email",
                            entity,
                            String.class
                    );

            System.out.println("BREVO RESPONSE : "
                    + response.getStatusCode());

        } catch (HttpStatusCodeException e) {

            System.out.println("BREVO STATUS: " + e.getStatusCode());

            System.out.println("BREVO RESPONSE:");
            System.out.println(e.getResponseBodyAsString());

        }
        catch (Exception e) {

            e.printStackTrace();

        }
    }

    public void sendIncomeExcelReport(
            String toEmail,
            String fullName,
            ByteArrayInputStream excelFile
    ) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            System.out.println("Sender Email: " + senderEmail);
            helper.setFrom(senderEmail, "FinTrack");

            helper.setTo(toEmail);

            helper.setSubject("Your FinTrack Income Report");

            helper.setText("""
                Hello %s,

                Please find attached your Income Report generated from FinTrack.

                Regards,
                FinTrack Team
                """.formatted(fullName));

            helper.addAttachment(
                    "Income_Report.xlsx",
                    new ByteArrayResource(excelFile.readAllBytes())
            );

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send report.", e);
        }
    }

    public void sendExpenseExcelReport(
            String toEmail,
            String fullName,
            ByteArrayInputStream excelFile
    ) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            System.out.println("Sender Email: " + senderEmail);
            helper.setFrom(senderEmail, "FinTrack");

            helper.setTo(toEmail);

            helper.setSubject("Your FinTrack Expense Report");

            helper.setText("""
            Hello %s,

            Please find attached your Expense Report generated from FinTrack.

            Regards,
            FinTrack Team
            """.formatted(fullName));

            helper.addAttachment(
                    "Expense_Report.xlsx",
                    new ByteArrayResource(excelFile.readAllBytes())
            );

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Unable to send report.", e);
        }
    }
}