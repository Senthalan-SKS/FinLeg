package com.finled.modules.accounting.journal.controller;

import com.finled.common.response.ApiResponse;
import com.finled.modules.accounting.journal.dto.CreateJournalEntryRequest;
import com.finled.modules.accounting.journal.service.JournalService;
import com.finled.modules.auth.security.userdetails.CustomUserDetails;
import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
            @Valid @RequestBody CreateJournalEntryRequest request,
            Authentication authentication
    ) {

        CustomUserDetails principal =
                (CustomUserDetails) authentication.getPrincipal();
        User currentUser = principal.getUser();
        Tenant tenant = currentUser.getTenant();

        UUID journalId = journalService.createJournalEntry(
                request,
                tenant,
                currentUser
        );

        return ResponseEntity.ok(
                ApiResponse.<UUID>builder()
                        .success(true)
                        .message("Journal posted successfully")
                        .data(journalId)
                        .build()
        );
    }
}
