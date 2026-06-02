package com.finled.modules.accounting.ledger.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Builder
public class GeneralLedgerTransactionResponse {

    private UUID journalEntryId;

    private String referenceNumber;

    private LocalDate transactionDate;

    private String description;

    private String lineDescription;

    private Double debitAmount;

    private Double creditAmount;
}
