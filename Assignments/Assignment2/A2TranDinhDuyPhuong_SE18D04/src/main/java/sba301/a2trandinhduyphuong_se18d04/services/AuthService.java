package sba301.a2trandinhduyphuong_se18d04.services;

import sba301.a2trandinhduyphuong_se18d04.dtos.request.LoginRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}
