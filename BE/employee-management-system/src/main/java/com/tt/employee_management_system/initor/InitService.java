package com.tt.employee_management_system.initor;

import com.tt.employee_management_system.domain.entity.Admin;
import com.tt.employee_management_system.domain.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InitService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        if (adminRepository.count() > 0) {
            return;
        }
        var admin = new Admin();
        admin.setEmail("tun@gmail.com");
        admin.setPassword(passwordEncoder.encode("12345"));
        adminRepository.save(admin);
    }
}
