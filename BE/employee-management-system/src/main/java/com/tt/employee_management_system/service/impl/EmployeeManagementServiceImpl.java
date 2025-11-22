package com.tt.employee_management_system.service.impl;

import com.tt.employee_management_system.domain.repository.EmployeeRepository;
import com.tt.employee_management_system.model.EmployeeRequest;
import com.tt.employee_management_system.model.EmployeeResponse;
import com.tt.employee_management_system.service.EmployeeManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeManagementServiceImpl implements EmployeeManagementService {

    private final EmployeeRepository employeeRepository;

    @Transactional
    @Override
    public EmployeeResponse createEmployee(EmployeeRequest employeeRequest) {
        var employee = employeeRequest.toEntity();
        employee = employeeRepository.save(employee);
        return EmployeeResponse.fromEntity(employee);
    }

    @Transactional(readOnly = true)
    @Override
    public List<EmployeeResponse> getAllEmployees() {
        var entities = employeeRepository.findAll();
        return entities.stream().map(EmployeeResponse::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        var entity = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found!"));
        return EmployeeResponse.fromEntity(entity);
    }

    @Transactional
    @Override
    public EmployeeResponse updateEmployeeInfo(Long id, EmployeeRequest employeeRequest) {
        var entity = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee Not Found!"));
        entity.setFirstName(employeeRequest.firstName());
        entity.setLastName(employeeRequest.lastName());
        entity.setEmail(employeeRequest.email());
        entity = employeeRepository.save(entity);
        return EmployeeResponse.fromEntity(entity);
    }

    @Transactional
    @Override
    public String deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
        return "Successfully Deleted";
    }
}
