package com.tt.employee_management_system.jwt;


import com.tt.employee_management_system.domain.repository.AdminRepository;
import com.tt.employee_management_system.model.ParseTokenResponse;
import com.tt.employee_management_system.model.TokenResponse;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtils {

    @Value("${app.jwt.token.secret}")
    private String SECRET_KEY;
    @Value("${app.jwt.token.issuer}")
    private String issuer;
    private SecretKey key;

    private static final String TOKEN_TYPE = "tokenType";

    @PostConstruct
    private void init() {
        this.key = getKey(SECRET_KEY);
    }


    public static String generateSecretKey() {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

//    public static void main(String[] args) {
//		System.out.println("Key :: ");
//		System.out.println(generateSecretKey());
//	}


    public String generateToken(String username , TokenType type) {
        var current = Calendar.getInstance();
        var builder = Jwts.builder().signWith(key);

        builder.subject(username)
                .issuer(issuer)
                .issuedAt(current.getTime())
                .expiration(getExpiration(type, current))
                .claim(TOKEN_TYPE, type.toString());

        return builder.compact();
    }


    public ParseTokenResponse parseToken(String token) {
        try {
            if (token == null || token.trim().isEmpty()) {
                throw new RuntimeException("Token is null or empty");
            }

            String tokenValue = token.startsWith("Bearer ") ? token.substring(7) : token;

            JwtParser parser = Jwts.parser()
                    .requireIssuer(issuer)
                    .verifyWith(key)
                    .build();

            Jws<Claims> jws = parser.parseSignedClaims(tokenValue);
            Claims claims = jws.getPayload();

            var username = claims.getSubject();
            var tokenType = claims.get(TOKEN_TYPE, String.class);
            return new ParseTokenResponse(username, TokenType.valueOf(tokenType));

        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Token Expired");
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Invalid Token: " + e.getMessage());
        }
    }


    private SecretKey getKey(String key) {
        return new SecretKeySpec(Base64.getDecoder().decode(key), "HmacSHA512");
    }

    private Date getExpiration(TokenType type, Calendar current) {

        switch (type) {
            case ACCESS:
                current.add(Calendar.MINUTE, 5);
                break;

            case REFRESH:
                current.add(Calendar.MINUTE, 30);
                break;

            default:
                throw new IllegalArgumentException("Invalid token type: " + type.toString());
        }

        return current.getTime();
    }



}
