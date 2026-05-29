package com.finled.modules.accounting.journal.repository;

import com.finled.modules.accounting.journal.entity.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JournalEntryRepository
        extends JpaRepository<JournalEntry, UUID> {
}