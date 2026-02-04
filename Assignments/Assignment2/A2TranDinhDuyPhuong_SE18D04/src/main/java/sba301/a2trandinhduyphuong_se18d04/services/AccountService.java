package sba301.a2trandinhduyphuong_se18d04.services;

import sba301.a2trandinhduyphuong_se18d04.dtos.request.AccountRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.AccountResponse;

import java.util.List;

public interface AccountService {

    List<AccountResponse> getAllAccounts();

    AccountResponse getAccountById(Long id);

    AccountResponse createAccount(AccountRequest request);

    AccountResponse updateAccount(Long id, AccountRequest request);

    void deleteAccount(Long id);

    List<AccountResponse> searchAccounts(String keyword);

}
