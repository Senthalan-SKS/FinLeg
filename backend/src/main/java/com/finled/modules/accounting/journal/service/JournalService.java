package com.finled.modules.accounting.journal.service;

import com.finled.common.exception.BadRequestException;
import com.finled.modules.accounting.account.entity.Account;
import com.finled.modules.accounting.account.repository.AccountRepository;
import com.finled.modules.accounting.journal.dto.CreateJournalEntryRequest;
import com.finled.modules.accounting.journal.dto.CreateJournalLineRequest;
import com.finled.modules.accounting.journal.entity.*;
import com.finled.modules.accounting.journal.repository.*;
import com.finled.modules.accounting.journal.validation.JournalValidationService;
import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JournalService {

    private final JournalEntryRepository journalEntryRepository;
    private final JournalLineRepository journalLineRepository;
    private final AccountRepository accountRepository;
    private final JournalValidationService validationService;

    @Transactional
    public UUID createJournalEntry(
            CreateJournalEntryRequest request,
            Tenant tenant,
            User currentUser
    ) {

        validationService.validateJournalLines(request.getLines());

        double totalDebit = 0;
        double totalCredit = 0;

        for (CreateJournalLineRequest line : request.getLines()) {
            totalDebit += line.getDebitAmount();
            totalCredit += line.getCreditAmount();
        }

        JournalEntry journalEntry = JournalEntry.builder()
                .tenant(tenant)
                .referenceNumber(generateReferenceNumber())
                .transactionDate(request.getTransactionDate())
                .description(request.getDescription())
                .totalDebit(totalDebit)
                .totalCredit(totalCredit)
                .status(JournalStatus.POSTED)
                .createdBy(currentUser)
                .createdAt(LocalDateTime.now())
                .build();

        journalEntryRepository.save(journalEntry);

        List<JournalLine> journalLines = new ArrayList<>();

        for (CreateJournalLineRequest lineRequest : request.getLines()) {

            Account account = accountRepository
                    .findByIdAndTenantId(
                            lineRequest.getAccountId(),
                            tenant.getId()
                    )
                    .orElseThrow(() ->
                            new BadRequestException("Account not found")
                    );

            JournalLine line = JournalLine.builder()
                    .journalEntry(journalEntry)
                    .account(account)
                    .debitAmount(lineRequest.getDebitAmount())
                    .creditAmount(lineRequest.getCreditAmount())
                    .lineDescription(lineRequest.getLineDescription())
                    .build();

            journalLines.add(line);
        }

        journalLineRepository.saveAll(journalLines);

        return journalEntry.getId();
    }

    private String generateReferenceNumber() {

        return "JE-" + System.currentTimeMillis();
    }
}