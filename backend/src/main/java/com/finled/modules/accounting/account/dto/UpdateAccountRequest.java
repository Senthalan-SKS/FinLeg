package com.finled.modules.accounting.account.dto;

import com.finled.modules.accounting.account.entity.AccountType;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAccountRequest {

    @NotBlank
    private String name;

    private String code;

    private AccountType type;

    private Boolean active;

    private Boolean postable;
}