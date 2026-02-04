package sba301.a2trandinhduyphuong_se18d04.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.AccountRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.AccountResponse;
import sba301.a2trandinhduyphuong_se18d04.entities.SystemAccount;
import sba301.a2trandinhduyphuong_se18d04.repositories.AccountRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.NewsArticleRepository;
import sba301.a2trandinhduyphuong_se18d04.services.AccountService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final NewsArticleRepository newsArticleRepository;

    @Override
    public List<AccountResponse> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AccountResponse getAccountById(Long id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
        return mapToResponse(account);
    }

    @Override
    public AccountResponse createAccount(AccountRequest request) {
        if (accountRepository.existsByAccountEmail(request.getAccountEmail())) {
            throw new RuntimeException("Email already exists: " + request.getAccountEmail());
        }

        SystemAccount account = new SystemAccount();
        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        account.setAccountPassword(request.getAccountPassword());

        SystemAccount saved = accountRepository.save(account);
        return mapToResponse(saved);
    }

    @Override
    public AccountResponse updateAccount(Long id, AccountRequest request) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

        // Check if email is being changed and if it's already taken
        if (!account.getAccountEmail().equals(request.getAccountEmail())
                && accountRepository.existsByAccountEmail(request.getAccountEmail())) {
            throw new RuntimeException("Email already exists: " + request.getAccountEmail());
        }

        account.setAccountName(request.getAccountName());
        account.setAccountEmail(request.getAccountEmail());
        account.setAccountRole(request.getAccountRole());
        if (request.getAccountPassword() != null && !request.getAccountPassword().isEmpty()) {
            account.setAccountPassword(request.getAccountPassword());
        }

        SystemAccount saved = accountRepository.save(account);
        return mapToResponse(saved);
    }

    @Override
    public void deleteAccount(Long id) {
        SystemAccount account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

        // Check if account has created any news articles
        if (newsArticleRepository.existsByCreatedByAccountId(id)) {
            throw new RuntimeException("Cannot delete account. This account has created news articles.");
        }

        accountRepository.delete(account);
    }

    @Override
    public List<AccountResponse> searchAccounts(String keyword) {
        return accountRepository.searchByKeyword(keyword).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AccountResponse mapToResponse(SystemAccount account) {
        return AccountResponse.builder()
                .accountId(account.getAccountId())
                .accountName(account.getAccountName())
                .accountEmail(account.getAccountEmail())
                .accountRole(account.getAccountRole())
                .roleName(account.getAccountRole() == 1 ? "Admin" : "Staff")
                .build();
    }

}
