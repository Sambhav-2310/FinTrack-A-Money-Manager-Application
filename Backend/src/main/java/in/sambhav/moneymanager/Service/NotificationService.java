package in.sambhav.moneymanager.Service;

import in.sambhav.moneymanager.DTO.ExpenseDTO;
import in.sambhav.moneymanager.Entity.ProfileEntity;
import in.sambhav.moneymanager.Respository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final ExpenseService expenseService;

    @Value("${money.manager.frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 0 22 * * *", zone = "IST") // Every day at 10 PM IST
    public void sendDailyIncomeExpenseReminder(){
        log.info("Job started: Sending daily income and expense reminder emails");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for(ProfileEntity profile : profiles){
            String body = "Hi" + profile.getFullName() + ",<br><br>" +
                    "Don't forget to log your income and expenses for today!<br>"
                    + "You can log your transactions here: <a href=\"" + frontendUrl + "\">Money Manager Web</a><br><br>"
                    + "Best regards,<br>"
                    + "Money Manager Team";

            emailService.sendEmail(profile.getEmail(), "Daily Reminder: Add Your Income and Expenses", body);
        }
        log.info("Job completed: Daily reminder emails sent to all users");
    }

    @Scheduled(cron = "0 0 23 * * *", zone = "IST") // Every day at 11 PM IST
    public void sendDailyExpenseSummary(){
        log.info("Job started: Sending daily expense summary emails");
        List<ProfileEntity> profiles = profileRepository.findAll();
        for(ProfileEntity profile: profiles){
            List<ExpenseDTO> todaysExpenses = expenseService.getExpensesForUserOnDate(profile.getId(), LocalDate.now());
            if(!todaysExpenses.isEmpty()){
                StringBuilder table = new StringBuilder();
                table.append("<table border='1' cellpadding='5' cellspacing='0'>")
                        .append("<tr><th>S no.</th><th>Name</th><th>Amount</th><th>Category</th></tr>");
                int i = 1;
                for(ExpenseDTO expense : todaysExpenses){
                    table.append("<tr>")
                            .append("<td style='border:1px solid #ddd;padding:8px;'>").append(i++).append("</td>")
                            .append("<td style='border:1px solid #ddd;padding:8px;'>").append(expense.getName()).append("</td>")
                            .append("<td style='border:1px solid #ddd;padding:8px;'>").append(expense.getAmount()).append("</td>")
                            .append("<td style='border:1px solid #ddd;padding:8px;'>").append(expense.getCategoryId() != null ? expense.getCategoryName() : "N/A").append("</td>")
                            .append("</tr>");
                }
                table.append("</table>");
                String body = "Hi " + profile.getFullName() + ",<br><br>" +
                        "Here is the summary of your expenses for today:<br><br>" +
                        table.toString() +
                        "<br>Don't forget to log any remaining transactions!<br>" +
                        "You can log your transactions here: <a href=\"" + frontendUrl + "\">Money Manager Web</a><br><br>" +
                        "Best regards,<br>" +
                        "Money Manager Team";
                emailService.sendEmail(profile.getEmail(), "Daily Expense Summary", body);
            }
        }
        log.info("Job completed: Daily expense summary emails sent to all users");
    }
}
