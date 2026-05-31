package com.finled.modules.accounting.account.dto;
import java.util.UUID;
import com.finled.modules.accounting.account.entity.AccountType;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountResponse {

    private UUID id;

    private String code;

    private String name;

    private AccountType type;

    private Boolean active;

    private Boolean postable;

    private UUID parentAccountId;
}