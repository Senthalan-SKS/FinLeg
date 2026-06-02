package com.finled.modules.accounting.journal.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
public class JournalLineResponse {

    private UUID id;

    private UUID accountId;

    private String accountCode;

    private String accountName;

    private Double debitAmount;

    private Double creditAmount;

    private String lineDescription;
}
