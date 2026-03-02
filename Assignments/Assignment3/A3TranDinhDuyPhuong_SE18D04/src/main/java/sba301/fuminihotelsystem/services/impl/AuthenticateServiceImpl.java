package sba301.fuminihotelsystem.services.impl;

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
import sba301.fuminihotelsystem.dtos.jwt.IntrospectRequest;
import sba301.fuminihotelsystem.dtos.jwt.IntrospectResponse;
import sba301.fuminihotelsystem.dtos.customer.CustomerRegisterRequest;
import sba301.fuminihotelsystem.dtos.customer.CustomerResponse;
import sba301.fuminihotelsystem.dtos.customer.LoginRequest;
import sba301.fuminihotelsystem.dtos.customer.LoginResponse;
import sba301.fuminihotelsystem.entities.Customer;
import sba301.fuminihotelsystem.exception.AppException;
import sba301.fuminihotelsystem.exception.ErrorCode;
import sba301.fuminihotelsystem.repositories.CustomerRepository;
import sba301.fuminihotelsystem.services.AuthenticateService;

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

    CustomerRepository customerRepository;
    PasswordEncoder passwordEncoder;
    sba301.fuminihotelsystem.mapper.CustomerMapper customerMapper;

    @NonFinal
    @Value("${signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${admin.staff.email}")
    protected String STAFF_EMAIL;

    @NonFinal
    @Value("${admin.staff.password}")
    protected String STAFF_PASSWORD;

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

        // Check if it's Staff login (from application.properties)
        if (STAFF_EMAIL.equalsIgnoreCase(email)) {
            if (STAFF_PASSWORD.equals(password)) {
                String token = generateStaffToken(email);
                return LoginResponse.builder()
                        .token(token)
                        .authenticated(true)
                        .build();
            } else {
                throw new AppException(ErrorCode.INVALID_CREDENTIALS);
            }
        }

        // Customer login from database
        var customer = customerRepository
                .findByEmailAddress(email)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (passwordEncoder.matches(password, customer.getPassword())) {
            String token = generateCustomerToken(customer);
            return LoginResponse.builder()
                    .token(token)
                    .authenticated(true)
                    .build();
        } else {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }
    }

    @Override
    public CustomerResponse register(CustomerRegisterRequest request) {
        // Check if email already exists
        if (customerRepository.findByEmailAddress(request.getEmailAddress()).isPresent()) {
            throw new AppException(ErrorCode.CUSTOMER_ALREADY_EXISTS);
        }

        Customer customer = new Customer();
        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setCustomerStatus((byte) 1); // active

        Customer saved = customerRepository.save(customer);
        log.info("New customer registered: {}", saved.getEmailAddress());
        return customerMapper.toCustomerResponse(saved);
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

    private String generateCustomerToken(Customer customer) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(customer.getEmailAddress())
                .issuer("SBA301.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("customerId", customer.getCustomerId())
                .claim("customerEmail", customer.getEmailAddress())
                .claim("fullName", customer.getCustomerFullName())
                .claim("scope", "ROLE_CUSTOMER")
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
