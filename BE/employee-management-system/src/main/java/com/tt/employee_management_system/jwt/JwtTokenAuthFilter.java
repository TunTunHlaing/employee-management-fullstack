package com.tt.employee_management_system.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtTokenAuthFilter extends OncePerRequestFilter {

    @Value("${app.jwt.token.secret}")
    private String secretKey;

    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        var token = request.getHeader("authorization");

        if (token != null && token.startsWith("Bearer ")) {

            token = token.substring(7);
            try {
                var tokenResponse = jwtUtils.parseToken(token);
                String username = tokenResponse.email();
                if (!tokenResponse.tokenType().equals(TokenType.ACCESS)) {
                    throw new RuntimeException("Invalid Token Type!");
                }
                if (username != null) {

                    var authorities = new ArrayList<SimpleGrantedAuthority>();

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

}

