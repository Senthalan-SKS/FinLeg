package com.finled.modules.auth.service;

import com.finled.common.exception.BadRequestException;
import com.finled.common.util.SlugUtil;
import com.finled.modules.auth.security.userdetails.CustomUserDetails;
import com.finled.modules.auth.security.jwt.JwtService;
import com.finled.modules.auth.dto.AuthResponse;
import com.finled.modules.auth.dto.LoginRequest;
import com.finled.modules.auth.dto.RegisterTenantRequest;
import com.finled.modules.tenant.entity.Tenant;
import com.finled.modules.tenant.repository.TenantRepository;
import com.finled.modules.user.entity.User;
import com.finled.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final TenantRepository tenantRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

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

        try {
            tenantRepository.saveAndFlush(tenant);
        } catch (DataAccessException e) {
            throw new BadRequestException("Failed to create tenant. Please verify tenant details and try again.");
        }

        User owner = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("OWNER")
                .tenant(tenant)
                .createdAt(LocalDateTime.now())
                .build();

        try {
            userRepository.saveAndFlush(owner);
        } catch (DataAccessException e) {
            throw new BadRequestException("Failed to create user. Please verify user details and try again.");
        }
        
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new BadRequestException("Invalid credentials");
        }

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new BadRequestException("Invalid credentials")
                );

        UserDetails userDetails = new CustomUserDetails(user);

        String token = jwtService.generateToken(
                user.getId(),
                user.getTenant().getId(),
                user.getRole(),
                userDetails
        );

        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .expiresIn(86400L)
                .build();
    }
}
