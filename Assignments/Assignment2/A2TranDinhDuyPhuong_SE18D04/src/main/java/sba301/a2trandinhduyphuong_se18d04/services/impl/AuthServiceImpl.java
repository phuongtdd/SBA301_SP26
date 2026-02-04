package sba301.a2trandinhduyphuong_se18d04.services.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.LoginRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.LoginResponse;
import sba301.a2trandinhduyphuong_se18d04.entities.SystemAccount;
import sba301.a2trandinhduyphuong_se18d04.repositories.AccountRepository;
import sba301.a2trandinhduyphuong_se18d04.services.AuthService;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AccountRepository accountRepository;

    @Value("${jwt.secret:FUNewsManagementSystemSecretKey12345678901234567890}")
    private String jwtSecret;

    @Override
    public LoginResponse login(LoginRequest request) {
        SystemAccount account = accountRepository.findByAccountEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Simple password check (in production, use BCrypt)
        if (!account.getAccountPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = generateToken(account);

        return LoginResponse.builder()
                .token(token)
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountEmail(account.getAccountEmail())
                .accountRole(account.getAccountRole())
                .build();
    }

    private String generateToken(SystemAccount account) {
        try {
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(account.getAccountEmail())
                    .issuer("FUNewsManagementSystem")
                    .claim("accountId", account.getAccountId())
                    .claim("role", account.getAccountRole())
                    .issueTime(new Date())
                    .expirationTime(Date.from(Instant.now().plus(24, ChronoUnit.HOURS)))
                    .build();

            Payload payload = new Payload(claimsSet.toJSONObject());
            JWSObject jwsObject = new JWSObject(header, payload);

            jwsObject.sign(new MACSigner(jwtSecret.getBytes()));

            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Error generating token", e);
        }
    }

}
