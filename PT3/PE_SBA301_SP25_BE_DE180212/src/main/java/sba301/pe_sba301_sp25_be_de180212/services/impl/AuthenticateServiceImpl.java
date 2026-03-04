package sba301.pe_sba301_sp25_be_de180212.services.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.AccountMemberRegisterRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.AccountMemberResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.LoginRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.LoginResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.jwt.IntrospectRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.jwt.IntrospectResponse;
import sba301.pe_sba301_sp25_be_de180212.entities.AccountMember;
import sba301.pe_sba301_sp25_be_de180212.exception.AppException;
import sba301.pe_sba301_sp25_be_de180212.exception.ErrorCode;
import sba301.pe_sba301_sp25_be_de180212.mapper.AccountMemberMapper;
import sba301.pe_sba301_sp25_be_de180212.repositories.AccountMemberRepository;
import sba301.pe_sba301_sp25_be_de180212.services.AuthenticateService;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticateServiceImpl implements AuthenticateService {

    AccountMemberRepository accountMemberRepository;
    AccountMemberMapper accountMemberMapper;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${valid-duration}")
    protected long VALID_DURATION;

    @Override
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException e) {
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    @Override
    public LoginResponse authenticate(LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Account member login from database
        var accountMember = accountMemberRepository
                .findByEmailAddress(email)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (passwordEncoder.matches(password, accountMember.getMemberPassword())) {
            String token = generateCustomerToken(accountMember);
            return LoginResponse.builder()
                    .token(token)
                    .authenticated(true)
                    .build();
        } else {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }
    }

    @Override
    public AccountMemberResponse register(AccountMemberRegisterRequest request) {
        // Check if email already exists
        if (accountMemberRepository.findByEmailAddress(request.getEmailAddress()).isPresent()) {
            throw new AppException(ErrorCode.CUSTOMER_ALREADY_EXISTS);
        }

        AccountMember accountMember = new AccountMember();
        accountMember.setEmailAddress(request.getEmailAddress());
        accountMember.setMemberPassword(passwordEncoder.encode(request.getMemberPassword()));
        accountMember.setMemberRole(3); // Assuming 3 is the role for accountMember

        AccountMember saved = accountMemberRepository.save(accountMember);
        log.info("New customer registered: {}", saved.getEmailAddress());
        return accountMemberMapper.toAccountMemberResponse(saved);
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiration = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(3600, ChronoUnit.SECONDS)
                        .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);
        if (!(verified && expiration.after(new Date()))) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        return signedJWT;
    }

    private String generateStaffToken(String email) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(email)
                .issuer("SBA301.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("role", "STAFF")
                .claim("scope", "ROLE_STAFF")
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (Exception e) {
            throw new AppException(ErrorCode.TOKEN_GENERATION_FAILED);
        }
    }

    private String generateCustomerToken(AccountMember accountMember) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(accountMember.getEmailAddress())
                .issuer("SBA301.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("accountMemberId", accountMember.getMemberId())
                .claim("accountMemberAddress", accountMember.getEmailAddress())
                .claim("scope",
                        accountMember.getMemberRole() != null && accountMember.getMemberRole() == 1 ? "ROLE_ADMIN"
                                : "ROLE_ACCOUNT-MEMBER")
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (Exception e) {
            throw new RuntimeException("Cannot generate token", e);
        }
    }
}
