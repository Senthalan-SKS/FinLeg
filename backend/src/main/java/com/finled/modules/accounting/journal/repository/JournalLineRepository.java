package com.finled.modules.accounting.journal.repository;

import com.finled.modules.accounting.journal.entity.JournalLine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JournalLineRepository
        extends JpaRepository<JournalLine, UUID> {
}