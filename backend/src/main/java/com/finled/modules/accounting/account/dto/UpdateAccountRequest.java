package com.finled.modules.accounting.account.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAccountRequest {

    @NotBlank
    private String name;

    private Boolean active;

    private Boolean postable;
}