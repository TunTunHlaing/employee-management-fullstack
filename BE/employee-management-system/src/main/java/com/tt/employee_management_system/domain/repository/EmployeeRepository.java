package com.tt.employee_management_system.domain.repository;

import com.tt.employee_management_system.domain.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
