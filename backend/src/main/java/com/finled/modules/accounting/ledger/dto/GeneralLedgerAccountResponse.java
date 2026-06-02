package com.finled.modules.accounting.ledger.dto;
   
import com.finled.modules.accounting.account.entity.AccountType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Builder
public class GeneralLedgerAccountResponse {

    private UUID accountId;

    private String accountCode;

    private String accountName;

    private AccountType accountType;

    private BigDecimal totalDebit;

    private BigDecimal totalCredit;

    private BigDecimal balance;
}
