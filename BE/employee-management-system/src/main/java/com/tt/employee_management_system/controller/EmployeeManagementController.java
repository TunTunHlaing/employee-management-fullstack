package com.tt.employee_management_system.controller;

import com.tt.employee_management_system.model.EmployeeRequest;
import com.tt.employee_management_system.model.EmployeeResponse;
import com.tt.employee_management_system.service.EmployeeManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/employee-management")
@RequiredArgsConstructor
public class EmployeeManagementController {

    private final EmployeeManagementService employeeManagementService;

    @PostMapping
    public EmployeeResponse createEmployee(@RequestBody EmployeeRequest employeeRequest) {
        return employeeManagementService.createEmployee(employeeRequest);
    }

    @GetMapping("{id}")
    public EmployeeResponse getEmployeeById(@PathVariable("id") Long id) {
        return employeeManagementService.getEmployeeById(id);
    }


    @GetMapping
    public List<EmployeeResponse> getAllEmployee() {
        return employeeManagementService.getAllEmployees();
    }

    @PutMapping("{id}")
    public EmployeeResponse updateEmployeeInfo(@PathVariable(name = "id") Long id,
                                               @RequestBody EmployeeRequest employeeRequest){
        return employeeManagementService.updateEmployeeInfo(id, employeeRequest);
    }

    @DeleteMapping("{id}")
    public String deleteEmployee(@PathVariable(name = "id") Long id) {
        return employeeManagementService.deleteEmployee(id);
    }
}
