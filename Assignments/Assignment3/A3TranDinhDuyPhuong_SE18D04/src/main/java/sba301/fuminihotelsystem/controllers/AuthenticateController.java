package sba301.fuminihotelsystem.controllers;

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
import sba301.fuminihotelsystem.common.ApiResponse;
import sba301.fuminihotelsystem.dtos.customer.CustomerRegisterRequest;
import sba301.fuminihotelsystem.dtos.customer.LoginRequest;
import sba301.fuminihotelsystem.exception.ErrorCode;
import sba301.fuminihotelsystem.services.AuthenticateService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticateController {

    AuthenticateService authenticateService;

    @PostMapping("/login")
    @Operation(summary = "Đăng nhập cho customer")
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
    @Operation(summary = "Đăng ký tài khoản customer")
    ApiResponse<?> register(@RequestBody @Valid CustomerRegisterRequest request) {
        try {
            log.info("Register request: {}", request.getEmailAddress());
            return ApiResponse.ok(authenticateService.register(request));
        } catch (Exception e) {
            log.error("Register request failed: {}", e.getMessage());
            return ApiResponse.error(e.getMessage(), ErrorCode.UNCAUGHT_EXCEPTION.getCode());
        }
    }
}