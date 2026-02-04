package sba301.a2trandinhduyphuong_se18d04.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sba301.a2trandinhduyphuong_se18d04.entities.SystemAccount;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<SystemAccount, Long> {

    Optional<SystemAccount> findByAccountEmail(String email);

    boolean existsByAccountEmail(String email);

    @Query("SELECT a FROM SystemAccount a WHERE " +
            "LOWER(a.accountName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.accountEmail) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<SystemAccount> searchByKeyword(@Param("keyword") String keyword);

}
