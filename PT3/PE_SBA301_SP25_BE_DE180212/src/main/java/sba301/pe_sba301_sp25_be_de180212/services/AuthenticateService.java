package sba301.pe_sba301_sp25_be_de180212.services;

import com.nimbusds.jose.JOSEException;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.AccountMemberRegisterRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.AccountMemberResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.LoginRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.LoginResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.jwt.IntrospectRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.jwt.IntrospectResponse;


import java.text.ParseException;

public interface AuthenticateService {
    public LoginResponse authenticate(LoginRequest loginRequest);

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException;

    public AccountMemberResponse register(AccountMemberRegisterRequest request);

}
