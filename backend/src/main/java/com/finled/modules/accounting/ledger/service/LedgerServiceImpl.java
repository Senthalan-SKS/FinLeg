package com.finled.modules.accounting.ledger.service;

import com.finled.modules.accounting.ledger.dto.GeneralLedgerAccountResponse;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerResponse;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerRow;
import com.finled.modules.accounting.journal.entity.JournalStatus;
import com.finled.modules.accounting.ledger.repository.JournalLineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LedgerServiceImpl implements LedgerService {

    private final JournalLineRepository journalLineRepository;

    @Override
    @Transactional(readOnly = true)
    public GeneralLedgerResponse getGeneralLedger(
            UUID tenantId,
            LocalDate fromDate,
            LocalDate toDate
    ) {
        List<GeneralLedgerRow> rows = journalLineRepository.getGeneralLedger(
                tenantId,
                fromDate,
                toDate,
                JournalStatus.POSTED
        );

        BigDecimal totalDebits = BigDecimal.ZERO;
        BigDecimal totalCredits = BigDecimal.ZERO;
        List<GeneralLedgerAccountResponse> accounts = new ArrayList<>();

        for (GeneralLedgerRow row : rows) {
            BigDecimal debit = row.getTotalDebit() != null ? row.getTotalDebit() : BigDecimal.ZERO;
            BigDecimal credit = row.getTotalCredit() != null ? row.getTotalCredit() : BigDecimal.ZERO;
            BigDecimal balance = debit.subtract(credit);

            totalDebits = totalDebits.add(debit);
            totalCredits = totalCredits.add(credit);

            accounts.add(
                    GeneralLedgerAccountResponse.builder()
                            .accountId(row.getAccountId())
                            .accountCode(row.getAccountCode())
                            .accountName(row.getAccountName())
                            .accountType(row.getAccountType())
                            .totalDebit(debit)
                            .totalCredit(credit)
                            .balance(balance)
                            .build()
            );
        }

        return GeneralLedgerResponse.builder()
                .totalDebits(totalDebits)
                .totalCredits(totalCredits)
                .accounts(accounts)
                .build();
    }
}
