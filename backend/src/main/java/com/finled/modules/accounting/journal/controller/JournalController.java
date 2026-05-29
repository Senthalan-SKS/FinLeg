package com.finled.modules.accounting.journal.controller;

import com.finled.common.response.ApiResponse;
import com.finled.modules.accounting.journal.dto.CreateJournalEntryRequest;
import com.finled.modules.accounting.journal.service.JournalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/journals")
@RequiredArgsConstructor
public class JournalController {

    private final JournalService journalService;

    @PostMapping
    public ResponseEntity<ApiResponse<UUID>> createJournal(
            @Valid @RequestBody CreateJournalEntryRequest request
    ) {

        // Replace later using authenticated user context
        UUID journalId = null;

        return ResponseEntity.ok(
                ApiResponse.<UUID>builder()
                        .success(true)
                        .message("Journal posted successfully")
                        .data(journalId)
                        .build()
        );
    }
}