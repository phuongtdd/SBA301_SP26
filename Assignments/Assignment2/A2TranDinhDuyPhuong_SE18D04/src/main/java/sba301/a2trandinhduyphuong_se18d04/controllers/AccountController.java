package sba301.a2trandinhduyphuong_se18d04.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.AccountRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.AccountResponse;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.ApiResponse;
import sba301.a2trandinhduyphuong_se18d04.services.AccountService;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getAllAccounts() {
        List<AccountResponse> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(ApiResponse.success(accounts));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccountById(@PathVariable Long id) {
        try {
            AccountResponse account = accountService.getAccountById(id);
            return ResponseEntity.ok(ApiResponse.success(account));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AccountResponse>> createAccount(@Valid @RequestBody AccountRequest request) {
        try {
            AccountResponse account = accountService.createAccount(request);
            return ResponseEntity.ok(ApiResponse.success("Account created successfully", account));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> updateAccount(
            @PathVariable Long id,
            @Valid @RequestBody AccountRequest request) {
        try {
            AccountResponse account = accountService.updateAccount(id, request);
            return ResponseEntity.ok(ApiResponse.success("Account updated successfully", account));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@PathVariable Long id) {
        try {
            accountService.deleteAccount(id);
            return ResponseEntity.ok(ApiResponse.success("Account deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<AccountResponse>>> searchAccounts(@RequestParam String keyword) {
        List<AccountResponse> accounts = accountService.searchAccounts(keyword);
        return ResponseEntity.ok(ApiResponse.success(accounts));
    }

}
