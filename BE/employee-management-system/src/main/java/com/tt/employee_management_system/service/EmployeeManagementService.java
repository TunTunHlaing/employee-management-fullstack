package com.tt.employee_management_system.service;

import com.tt.employee_management_system.model.EmployeeRequest;
import com.tt.employee_management_system.model.EmployeeResponse;

import java.util.List;

public interface EmployeeManagementService {

    EmployeeResponse createEmployee(EmployeeRequest employeeRequest);

    List<EmployeeResponse> getAllEmployees();

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse updateEmployeeInfo(Long id, EmployeeRequest employeeRequest);

    String deleteEmployee(Long id);
}
