package com.finled.modules.accounting.journal.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class CreateJournalLineRequest {

    @NotNull
    private UUID accountId;

    private Double debitAmount = 0.0;

    private Double creditAmount = 0.0;

    private String lineDescription;
}