package com.tt.employee_management_system.service.impl;

import com.tt.employee_management_system.domain.repository.AdminRepository;
import com.tt.employee_management_system.jwt.JwtUtils;
import com.tt.employee_management_system.jwt.TokenType;
import com.tt.employee_management_system.model.LoginRequest;
import com.tt.employee_management_system.model.RefreshTokenRequest;
import com.tt.employee_management_system.model.TokenResponse;
import com.tt.employee_management_system.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtUtils jwtUtils;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public TokenResponse login(LoginRequest request) {
        System.out.println("Email :: " + request.email());
        var admin = adminRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Admin Not Found With This Email!"));
        if (!passwordEncoder.matches(request.password(), admin.getPassword())) {
            throw new RuntimeException("Invalid Password!");
        }
        return new TokenResponse(
                jwtUtils.generateToken(admin.getEmail(), TokenType.ACCESS),
                jwtUtils.generateToken(admin.getEmail(), TokenType.REFRESH)
        );
    }

    @Override
    public TokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        var parsedToken = jwtUtils.parseToken(refreshTokenRequest.refreshToken());
        if (parsedToken.tokenType() != TokenType.REFRESH) {
            throw new RuntimeException("Invalid Token Type!");
        }
        return new TokenResponse(
                jwtUtils.generateToken(parsedToken.email(), TokenType.ACCESS),
                jwtUtils.generateToken(parsedToken.email(), TokenType.REFRESH)
        );
    }

}
