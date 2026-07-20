package in.sambhav.moneymanager.DTO;

import lombok.Data;
import java.util.List;

@Data
public class BrevoEmailRequestDTO {

    private Sender sender;
    private List<Recipient> to;
    private String subject;
    private String htmlContent;

    @Data
    public static class Sender {
        private String email;
        private String name;
    }

    @Data
    public static class Recipient {
        private String email;
    }
}