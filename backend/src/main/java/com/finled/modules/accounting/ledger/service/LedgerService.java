package com.finled.modules.accounting.ledger.service;

import java.time.LocalDate;
import java.util.UUID;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerResponse;

public interface LedgerService {
    GeneralLedgerResponse getGeneralLedger(
            UUID tenantId,
            LocalDate fromDate,
            LocalDate toDate);
}
