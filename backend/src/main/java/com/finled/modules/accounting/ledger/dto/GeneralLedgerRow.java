package com.finled.modules.accounting.ledger.dto;

import com.finled.modules.accounting.account.entity.AccountType;

import java.math.BigDecimal;
import java.util.UUID;

public interface GeneralLedgerRow {

    UUID getAccountId();

    String getAccountCode();

    String getAccountName();

    AccountType getAccountType();

    BigDecimal getTotalDebit();

    BigDecimal getTotalCredit();
}