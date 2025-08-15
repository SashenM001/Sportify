package com.sportify.sportsmanagementsystem.security.jwt;

import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
//import java.security.KeyPair;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final SecretKey key;

    @Value("${jwt.expiration.time}")
    private long expirationTime;

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generates a JWT token (updated for latest jjwt)
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date exp = new Date(nowMillis + expirationTime);
        String token = Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(exp)
                .signWith(key)
                .compact();
        return token;
    }


    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect", ex.fillInStackTrace());
        }
    }

}