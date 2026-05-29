package com.finled.modules.accounting.journal.entity;

import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "journal_entries",
        indexes = {
                @Index(name = "idx_journal_tenant", columnList = "tenant_id"),
                @Index(name = "idx_journal_date", columnList = "transaction_date"),
                @Index(name = "idx_journal_reference", columnList = "reference_number")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @Column(nullable = false, unique = true)
    private String referenceNumber;

    @Column(nullable = false)
    private LocalDate transactionDate;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Double totalDebit;

    @Column(nullable = false)
    private Double totalCredit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JournalStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}