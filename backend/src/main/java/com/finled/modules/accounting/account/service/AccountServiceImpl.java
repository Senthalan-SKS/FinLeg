package com.finled.modules.accounting.account.service;

import com.finled.common.exception.BadRequestException;
import com.finled.modules.accounting.account.repository.AccountRepository;
import com.finled.modules.accounting.account.entity.Account;
import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.accounting.account.dto.CreateAccountRequest;
import com.finled.modules.accounting.account.dto.UpdateAccountRequest;
import com.finled.modules.accounting.account.dto.AccountResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;  
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Transactional
public class AccountServiceImpl
        implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public UUID create(
            UUID tenantId,
            CreateAccountRequest request
    ) {

        if (accountRepository.existsByTenantIdAndCode(
                tenantId,
                request.getCode()
        )) {
            throw new BadRequestException(
                    "Account code already exists"
            );
        }

        Account parent = null;

        if (request.getParentAccountId() != null) {

            parent = accountRepository
                    .findByIdAndTenantId(
                            request.getParentAccountId(),
                            tenantId
                    )
                    .orElseThrow(() ->
                            new BadRequestException(
                                    "Parent account not found"
                            ));
        }

        Account account = Account.builder()
                .tenant(
                        Tenant.builder()
                                .id(tenantId)
                                .build()
                )
                .code(request.getCode())
                .name(request.getName())
                .type(request.getType())
                .parentAccount(parent)
                .postable(request.getPostable())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        accountRepository.save(account);

        return account.getId();
    }

    @Override
    @Transactional(readOnly = true)
    public AccountResponse getById(
            UUID tenantId,
            UUID accountId
    ) {

        Account account = accountRepository
                .findByIdAndTenantId(
                        accountId,
                        tenantId
                )
                .orElseThrow(() ->
                        new BadRequestException(
                                "Account not found"
                        ));

        return map(account);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountResponse> getAll(
            UUID tenantId
    ) {

        return accountRepository
                .findAllByTenantIdOrderByCode(
                        tenantId
                )
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public void update(
            UUID tenantId,
            UUID accountId,
            UpdateAccountRequest request
    ) {

        Account account = accountRepository
                .findByIdAndTenantId(
                        accountId,
                        tenantId
                )
                .orElseThrow(() ->
                        new BadRequestException(
                                "Account not found"
                        ));

        account.setName(request.getName());

        if (request.getActive() != null) {
            account.setActive(request.getActive());
        }

        if (request.getPostable() != null) {
            account.setPostable(request.getPostable());
        }
    }

    @Override
    public void deactivate(
            UUID tenantId,
            UUID accountId
    ) {

        Account account = accountRepository
                .findByIdAndTenantId(
                        accountId,
                        tenantId
                )
                .orElseThrow(() ->
                        new BadRequestException(
                                "Account not found"
                        ));

        account.setActive(false);
    }

    private AccountResponse map(Account account) {

        return AccountResponse.builder()
                .id(account.getId())
                .code(account.getCode())
                .name(account.getName())
                .type(account.getType())
                .active(account.getActive())
                .postable(account.getPostable())
                .parentAccountId(
                        account.getParentAccount() != null
                                ? account.getParentAccount().getId()
                                : null
                )
                .build();
    }
}