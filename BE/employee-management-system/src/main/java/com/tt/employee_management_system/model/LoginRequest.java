package com.tt.employee_management_system.model;

import jakarta.validation.constraints.NotNull;

public record LoginRequest(
        @NotNull(message = "Email Must Not Be Null!")
        String email,
        @NotNull(message = "Password Must Not Be Null!")
        String password
) {
}
