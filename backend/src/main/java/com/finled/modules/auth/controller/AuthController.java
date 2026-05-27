package com.finled.modules.auth.controller;

import com.finled.common.response.ApiResponse;
import com.finled.modules.auth.dto.RegisterTenantRequest;
import com.finled.modules.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Object>> register(
            @Valid @RequestBody RegisterTenantRequest request
    ) {

        authService.registerTenant(request);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Tenant registered successfully")
                        .build()
        );
    }
}