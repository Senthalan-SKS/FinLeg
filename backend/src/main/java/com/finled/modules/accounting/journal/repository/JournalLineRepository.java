package com.finled.modules.accounting.journal.repository;

import com.finled.modules.accounting.journal.entity.JournalLine;
import com.finled.modules.accounting.journal.entity.JournalStatus;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerRow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JournalLineRepository
        extends JpaRepository<JournalLine, UUID> {

    @Query("""
            SELECT
                a.id as accountId,
                a.code as accountCode,
                a.name as accountName,
                a.type as accountType,
                COALESCE(SUM(jl.debitAmount), 0) as totalDebit,
                COALESCE(SUM(jl.creditAmount), 0) as totalCredit
            FROM JournalLine jl
            JOIN jl.account a
            JOIN jl.journalEntry je
            WHERE je.tenant.id = :tenantId
              AND je.status = :status
              AND je.transactionDate BETWEEN :fromDate AND :toDate
            GROUP BY a.id, a.code, a.name, a.type
            ORDER BY a.code
            """)
    List<GeneralLedgerRow> getGeneralLedger(
            @Param("tenantId") UUID tenantId,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("status") JournalStatus status
    );

    List<JournalLine> findAllByJournalEntryIdOrderById(
            UUID journalEntryId
    );
}
