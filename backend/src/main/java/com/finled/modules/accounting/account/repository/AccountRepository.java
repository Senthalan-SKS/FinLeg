package com.finled.modules.accounting.account.repository;

import com.finled.modules.accounting.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface AccountRepository
        extends JpaRepository<Account, UUID> {

    Optional<Account> findByIdAndTenantId(
            UUID id,
            UUID tenantId
    );

    boolean existsByTenantIdAndCode(
            UUID tenantId,
            String code
    );

    List<Account> findAllByTenantIdOrderByCode(
            UUID tenantId
    );
}