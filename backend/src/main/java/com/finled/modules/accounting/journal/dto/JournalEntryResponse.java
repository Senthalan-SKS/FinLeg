package com.finled.modules.accounting.journal.dto;

import com.finled.modules.accounting.journal.entity.JournalStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
public class JournalEntryResponse {

    private UUID id;

    private String referenceNumber;

    private LocalDate transactionDate;

    private String description;

    private Double totalDebit;

    private Double totalCredit;

    private JournalStatus status;

    private UUID createdById;

    private String createdByName;

    private LocalDateTime createdAt;

    private List<JournalLineResponse> lines;
}
