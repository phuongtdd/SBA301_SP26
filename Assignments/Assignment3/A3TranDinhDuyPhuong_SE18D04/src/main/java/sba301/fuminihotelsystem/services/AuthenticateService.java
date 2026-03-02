package sba301.fuminihotelsystem.services;

import com.nimbusds.jose.JOSEException;
import sba301.fuminihotelsystem.dtos.jwt.IntrospectRequest;
import sba301.fuminihotelsystem.dtos.jwt.IntrospectResponse;
import sba301.fuminihotelsystem.dtos.customer.CustomerRegisterRequest;
import sba301.fuminihotelsystem.dtos.customer.CustomerResponse;
import sba301.fuminihotelsystem.dtos.customer.LoginRequest;
import sba301.fuminihotelsystem.dtos.customer.LoginResponse;

import java.text.ParseException;

public interface AuthenticateService {
    public LoginResponse authenticate(LoginRequest loginRequest);

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    public CustomerResponse register(CustomerRegisterRequest request);

}
