package com.finled.modules.accounting.ledger.service;

import com.finled.modules.accounting.ledger.dto.GeneralLedgerAccountResponse;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerResponse;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerRow;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerTransactionResponse;
import com.finled.modules.accounting.ledger.dto.JournalLineWithEntryRow;
import com.finled.modules.accounting.journal.entity.JournalStatus;
import com.finled.modules.accounting.journal.repository.JournalLineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

        List<JournalLineWithEntryRow> lines = journalLineRepository.getJournalLinesWithEntry(
                tenantId,
                fromDate,
                toDate,
                JournalStatus.POSTED
        );

        Map<UUID, List<GeneralLedgerTransactionResponse>> transactionsByAccount = new HashMap<>();
        for (JournalLineWithEntryRow line : lines) {
            transactionsByAccount
                    .computeIfAbsent(line.getAccountId(), k -> new ArrayList<>())
                    .add(
                            GeneralLedgerTransactionResponse.builder()
                                    .journalEntryId(line.getJournalEntryId())
                                    .referenceNumber(line.getReferenceNumber())
                                    .transactionDate(line.getTransactionDate())
                                    .description(line.getDescription())
                                    .lineDescription(line.getLineDescription())
                                    .debitAmount(line.getDebitAmount())
                                    .creditAmount(line.getCreditAmount())
                                    .build()
                    );
        }

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
                            .transactions(
                                    transactionsByAccount.getOrDefault(
                                            row.getAccountId(), List.of()
                                    )
                            )
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
