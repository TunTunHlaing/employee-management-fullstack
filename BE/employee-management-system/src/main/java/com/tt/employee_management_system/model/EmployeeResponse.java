package com.tt.employee_management_system.model;


import com.tt.employee_management_system.domain.entity.Employee;

public record EmployeeResponse(
        Long id,
        String firstName,
        String lastName,
        String email
) {

    public static EmployeeResponse fromEntity(Employee entity) {
        return new EmployeeResponse(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail()
        );
    }

}
