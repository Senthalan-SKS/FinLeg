package com.finled.modules.accounting.journal.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CreateJournalEntryRequest {

    @NotNull
    private LocalDate transactionDate;

    @NotBlank
    private String description;

    @Valid
    @NotEmpty
    private List<CreateJournalLineRequest> lines;
}