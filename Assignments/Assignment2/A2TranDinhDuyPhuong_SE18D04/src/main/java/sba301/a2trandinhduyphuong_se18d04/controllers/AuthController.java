package sba301.a2trandinhduyphuong_se18d04.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.LoginRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.ApiResponse;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.LoginResponse;
import sba301.a2trandinhduyphuong_se18d04.services.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.success("Login successful", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

}
