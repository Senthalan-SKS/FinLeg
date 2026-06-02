package com.finled.modules.accounting.ledger.dto;

import java.time.LocalDate;
import java.util.UUID;

public interface JournalLineWithEntryRow {

    UUID getAccountId();

    UUID getJournalEntryId();

    String getReferenceNumber();

    LocalDate getTransactionDate();

    String getDescription();

    Double getDebitAmount();

    Double getCreditAmount();

    String getLineDescription();
}
