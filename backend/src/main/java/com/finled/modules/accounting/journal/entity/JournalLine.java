package com.finled.modules.accounting.journal.entity;

import com.finled.modules.accounting.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "journal_lines",
        indexes = {
                @Index(name = "idx_line_journal", columnList = "journal_entry_id"),
                @Index(name = "idx_line_account", columnList = "account_id")
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalLine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "journal_entry_id", nullable = false)
    private JournalEntry journalEntry;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(nullable = false)
    private Double debitAmount;

    @Column(nullable = false)
    private Double creditAmount;

    @Column(length = 500)
    private String lineDescription;
}