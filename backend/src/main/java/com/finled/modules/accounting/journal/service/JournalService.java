package com.finled.modules.accounting.journal.service;

import com.finled.common.exception.BadRequestException;
import com.finled.modules.accounting.account.entity.Account;
import com.finled.modules.accounting.account.repository.AccountRepository;
import com.finled.modules.accounting.journal.dto.JournalEntryResponse;
import com.finled.modules.accounting.journal.dto.CreateJournalEntryRequest;
import com.finled.modules.accounting.journal.dto.CreateJournalLineRequest;
import com.finled.modules.accounting.journal.dto.JournalLineResponse;
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

    @Transactional(readOnly = true)
    public JournalEntryResponse getJournalEntry(
            UUID tenantId,
            UUID journalEntryId
    ) {

        JournalEntry journalEntry = journalEntryRepository
                .findByIdAndTenantId(journalEntryId, tenantId)
                .orElseThrow(() ->
                        new BadRequestException("Journal entry not found")
                );

        return map(journalEntry);
    }

    @Transactional(readOnly = true)
    public List<JournalEntryResponse> getAllJournalEntries(
            UUID tenantId
    ) {

        return journalEntryRepository
                .findAllByTenantIdOrderByTransactionDateDescCreatedAtDesc(
                        tenantId
                )
                .stream()
                .map(this::map)
                .toList();
    }

    private String generateReferenceNumber() {

        return "JE-" + System.currentTimeMillis();
    }

    private JournalEntryResponse map(JournalEntry journalEntry) {

        List<JournalLineResponse> lines = journalLineRepository
                .findAllByJournalEntryIdOrderById(journalEntry.getId())
                .stream()
                .map(line -> JournalLineResponse.builder()
                        .id(line.getId())
                        .accountId(line.getAccount().getId())
                        .accountCode(line.getAccount().getCode())
                        .accountName(line.getAccount().getName())
                        .debitAmount(line.getDebitAmount())
                        .creditAmount(line.getCreditAmount())
                        .lineDescription(line.getLineDescription())
                        .build())
                .toList();

        return JournalEntryResponse.builder()
                .id(journalEntry.getId())
                .referenceNumber(journalEntry.getReferenceNumber())
                .transactionDate(journalEntry.getTransactionDate())
                .description(journalEntry.getDescription())
                .totalDebit(journalEntry.getTotalDebit())
                .totalCredit(journalEntry.getTotalCredit())
                .status(journalEntry.getStatus())
                .createdById(
                        journalEntry.getCreatedBy() != null
                                ? journalEntry.getCreatedBy().getId()
                                : null
                )
                .createdByName(
                        journalEntry.getCreatedBy() != null
                                ? journalEntry.getCreatedBy().getFullName()
                                : null
                )
                .createdAt(journalEntry.getCreatedAt())
                .lines(lines)
                .build();
    }
}
