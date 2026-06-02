package com.finled.modules.accounting.ledger.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class GeneralLedgerResponse {

    private BigDecimal totalDebits;

    private BigDecimal totalCredits;

    private List<GeneralLedgerAccountResponse> accounts;
}