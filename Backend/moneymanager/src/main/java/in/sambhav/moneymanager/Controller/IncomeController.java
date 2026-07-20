package in.sambhav.moneymanager.Controller;

import in.sambhav.moneymanager.DTO.ExpenseDTO;
import in.sambhav.moneymanager.DTO.IncomeDTO;
import in.sambhav.moneymanager.Service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO dto){
        IncomeDTO createdExpense = incomeService.addIncome(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncome(){
        List<IncomeDTO> incomes = incomeService.getCurrentMonthIncomesForCurrentUser();
        return ResponseEntity.ok(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id){
        incomeService.deleteExpenseById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download")
    public ResponseEntity<InputStreamResource> downloadIncomeExcel() throws IOException {

        ByteArrayInputStream excel = incomeService.exportIncomeToExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=Income_Report.xlsx"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(excel));
    }

    @PostMapping("/email-excel")
    public ResponseEntity<String> sendIncomeReport() {
        incomeService.sendIncomeReportToCurrentUser();

        return ResponseEntity.ok("Income report sent successfully.");
    }
}
