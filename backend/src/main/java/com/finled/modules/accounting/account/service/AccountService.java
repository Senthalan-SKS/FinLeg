package com.finled.modules.accounting.account.service;

import com.finled.modules.accounting.account.dto.CreateAccountRequest;
import com.finled.modules.accounting.account.dto.UpdateAccountRequest;
import com.finled.modules.accounting.account.dto.AccountResponse;
import java.util.List;
import java.util.UUID;


public interface AccountService {

    UUID create(
            UUID tenantId,
            CreateAccountRequest request
    );

    AccountResponse getById(
            UUID tenantId,
            UUID accountId
    );

    List<AccountResponse> getAll(
            UUID tenantId
    );

    void update(
            UUID tenantId,
            UUID accountId,
            UpdateAccountRequest request
    );

    void deactivate(
            UUID tenantId,
            UUID accountId
    );
}