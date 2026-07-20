package in.sambhav.moneymanager.Service;

import in.sambhav.moneymanager.DTO.ExpenseDTO;
import in.sambhav.moneymanager.DTO.IncomeDTO;
import in.sambhav.moneymanager.DTO.RecentTransactionDTO;
import in.sambhav.moneymanager.Entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseService expenseService;
    private final IncomeService incomeService;
    private final ProfileService profileService;

    public Map<String, Object> getDashboardData(){
        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String, Object> returnValue = new LinkedHashMap<>();
        List<IncomeDTO> lastestIncomes = incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDTO> lastestExpenses = expenseService.getLatest5ExpensesForCurrentUser();
        List<RecentTransactionDTO> recentTransaction = concat(lastestIncomes.stream().map(income ->
                RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(profile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
        lastestExpenses.stream().map(expense ->
                RecentTransactionDTO.builder()
                        .id(expense.getId())
                        .profileId(profile.getId())
                        .icon(expense.getIcon())
                        .name(expense.getName())
                        .amount(expense.getAmount())
                        .date(expense.getDate())
                        .createdAt(expense.getCreatedAt())
                        .updatedAt(expense.getUpdatedAt())
                        .type("expense")
                        .build()))
                .sorted((a,b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if(cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null){
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    } else {
                        return cmp;
                    }
                }).collect(Collectors.toList());

        returnValue.put("totalBalance",
                incomeService.getTotalIncomesForCurrentUser()
                        .subtract(expenseService.getTotalExpensesForCurrentUser()));

        returnValue.put("totalIncomes", incomeService.getTotalIncomesForCurrentUser());
        returnValue.put("totalExpenses", expenseService.getTotalExpensesForCurrentUser());
        returnValue.put("recent5Expense", lastestExpenses );
        returnValue.put("recent5Income", lastestIncomes );
        returnValue.put("recentTransactions", recentTransaction);

        return returnValue;
    }
}
