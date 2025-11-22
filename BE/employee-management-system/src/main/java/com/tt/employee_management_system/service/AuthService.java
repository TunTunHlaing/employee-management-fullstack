package com.tt.employee_management_system.service;

import com.tt.employee_management_system.model.LoginRequest;
import com.tt.employee_management_system.model.RefreshTokenRequest;
import com.tt.employee_management_system.model.TokenResponse;

public interface AuthService {

    TokenResponse login(LoginRequest request);

    TokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

}
