package com.tt.employee_management_system.model;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {
}
