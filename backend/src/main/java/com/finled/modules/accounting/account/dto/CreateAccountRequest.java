package com.finled.modules.accounting.account.dto;

import java.util.UUID;
import com.finled.modules.accounting.account.entity.AccountType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccountRequest {

    @NotBlank
    private String code;

    @NotBlank
    private String name;

    @NotNull
    private AccountType type;

    private UUID parentAccountId;

    private Boolean postable = true;
}