package com.tt.employee_management_system.model;

import com.tt.employee_management_system.domain.entity.Employee;
import jakarta.validation.constraints.NotNull;

public record EmployeeRequest(
        @NotNull(message = "First Name Must Not Be Null!")
        String firstName,
        @NotNull(message = "Last Name Must Not Be Null!")
        String lastName,
        @NotNull(message = "Email Must Not Be Null!")
        String email
) {

    public Employee toEntity() {
        var employee = new Employee();
        employee.setEmail(email);
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        return employee;
    }
}
