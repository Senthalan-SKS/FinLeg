package com.finled.modules.accounting.account.controller;

import com.finled.common.response.ApiResponse;
import com.finled.modules.accounting.account.dto.CreateAccountRequest;
import com.finled.modules.accounting.account.dto.UpdateAccountRequest;
import com.finled.modules.accounting.account.dto.AccountResponse;
import com.finled.modules.accounting.account.service.AccountService;
import com.finled.modules.auth.security.userdetails.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<ApiResponse<UUID>> create(
            @Valid @RequestBody CreateAccountRequest request,
            Authentication authentication

    ) {

       UUID tenantId = ((CustomUserDetails) authentication.getPrincipal())
                    .getUser()
                    .getTenant()
                    .getId();

        UUID id = accountService.create(
                tenantId,
                request
        );

        return ResponseEntity.ok(
                ApiResponse.<UUID>builder()
                        .success(true)
                        .message("Account created")
                        .data(id)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getById(
            @PathVariable UUID id,
            Authentication authentication
    ) {
         UUID tenantId = ((CustomUserDetails) authentication.getPrincipal())
                    .getUser()
                    .getTenant()
                    .getId();

        return ResponseEntity.ok(
                ApiResponse.<AccountResponse>builder()
                        .success(true)
                        .data(
                                accountService.getById(tenantId,id)
                        )
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getAll(
            Authentication authentication
    ) {
        UUID tenantId = ((CustomUserDetails) authentication.getPrincipal())
                    .getUser()
                    .getTenant()
                    .getId();

        return ResponseEntity.ok(
                ApiResponse.<List<AccountResponse>>builder()
                        .success(true)
                        .data(
                                accountService.getAll(tenantId)
                        )
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateAccountRequest request,
            Authentication authentication
    ) {
        UUID tenantId = ((CustomUserDetails) authentication.getPrincipal())
                    .getUser()
                    .getTenant()
                    .getId();

        accountService.update(tenantId, id, request);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Account updated")
                        .build()
        );
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivate(
            @PathVariable UUID id,
            Authentication authentication
    ) {
        UUID tenantId = ((CustomUserDetails) authentication.getPrincipal())
                    .getUser()
                    .getTenant()
                    .getId();

        accountService.deactivate( tenantId, id );

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Account deactivated")
                        .build()
        );
    }
}