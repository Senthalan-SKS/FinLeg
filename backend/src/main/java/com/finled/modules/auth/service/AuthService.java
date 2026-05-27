package com.finled.modules.auth.service;

import com.finled.common.exception.BadRequestException;
import com.finled.common.util.SlugUtil;
import com.finled.modules.auth.dto.RegisterTenantRequest;
import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.tenant.repository.TenantRepository;
import com.finled.modules.user.entity.User;
import com.finled.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void registerTenant(RegisterTenantRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        String slug = SlugUtil.toSlug(request.getCompanyName());

        if (tenantRepository.findBySlug(slug).isPresent()) {
            throw new BadRequestException("Company slug already exists");
        }

        Tenant tenant = Tenant.builder()
                .companyName(request.getCompanyName())
                .slug(slug)
                .email(request.getEmail())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();

        tenantRepository.save(tenant);

        User owner = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("OWNER")
                .tenant(tenant)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(owner);
    }
}