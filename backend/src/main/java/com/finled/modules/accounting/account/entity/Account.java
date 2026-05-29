package com.finled.modules.accounting.account.entity;

import com.finled.modules.tenant.entity.Tenant;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "accounts",
        indexes = {
                @Index(name = "idx_account_tenant", columnList = "tenant_id"),
                @Index(name = "idx_account_code", columnList = "code")
        },
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_tenant_account_code",
                        columnNames = {"tenant_id", "code"}
                )
        }
)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id", nullable = false)
    private Tenant tenant;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType type;

    @Column(nullable = false)
    private Boolean active;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}