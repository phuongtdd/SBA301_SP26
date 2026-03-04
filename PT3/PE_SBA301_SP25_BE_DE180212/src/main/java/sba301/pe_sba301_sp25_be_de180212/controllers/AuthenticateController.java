package sba301.pe_sba301_sp25_be_de180212.controllers;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sba301.pe_sba301_sp25_be_de180212.common.ApiResponse;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.AccountMemberRegisterRequest;
import sba301.pe_sba301_sp25_be_de180212.dtos.account_member.LoginRequest;
import sba301.pe_sba301_sp25_be_de180212.exception.ErrorCode;
import sba301.pe_sba301_sp25_be_de180212.services.AuthenticateService;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticateController {

    AuthenticateService authenticateService;

    @PostMapping("/login")
    @Operation(summary = "Đăng nhập cho account member")
    ApiResponse<?> login(@RequestBody @Valid LoginRequest loginRequest) {
        try {
            log.info("Login request: {}", loginRequest);
            return ApiResponse.ok(authenticateService.authenticate(loginRequest));
        } catch (Exception e) {
            log.error("Login request failed: {}", loginRequest);
            return ApiResponse.error(e.getMessage(), ErrorCode.UNCAUGHT_EXCEPTION.getCode());
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Đăng ký tài khoản account member")
    ApiResponse<?> register(@RequestBody @Valid AccountMemberRegisterRequest request) {
        try {
            log.info("Register request: {}", request.getEmailAddress());
            return ApiResponse.ok(authenticateService.register(request));
        } catch (Exception e) {
            log.error("Register request failed: {}", e.getMessage());
            return ApiResponse.error(e.getMessage(), ErrorCode.UNCAUGHT_EXCEPTION.getCode());
        }
    }
}