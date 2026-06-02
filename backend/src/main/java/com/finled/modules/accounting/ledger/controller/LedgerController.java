package com.finled.modules.accounting.ledger.controller;

import com.finled.common.response.ApiResponse;
import com.finled.modules.accounting.ledger.dto.GeneralLedgerResponse;
import com.finled.modules.accounting.ledger.service.LedgerService;
import com.finled.modules.auth.security.userdetails.CustomUserDetails;
import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/ledgers")
@RequiredArgsConstructor
public class LedgerController {

    private final LedgerService ledgerService;

    @GetMapping("/general")
    public ResponseEntity<ApiResponse<GeneralLedgerResponse>> getGeneralLedger(
            @RequestParam LocalDate fromDate,
            @RequestParam LocalDate toDate,
            Authentication authentication
    ) {
        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        User currentUser = principal.getUser();
        Tenant tenant = currentUser.getTenant();
        UUID tenantId = tenant.getId();

        return ResponseEntity.ok(
                ApiResponse.<GeneralLedgerResponse>builder()
                        .success(true)
                        .data(
                                ledgerService.getGeneralLedger(
                                        tenantId,
                                        fromDate,
                                        toDate
                                )
                        )
                        .build()
        );
    }
}
