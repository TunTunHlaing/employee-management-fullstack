package com.tt.employee_management_system.model;

import com.tt.employee_management_system.jwt.TokenType;

public record ParseTokenResponse(
        String email,
        TokenType tokenType
) {
}
