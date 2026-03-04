package sba301.pe_sba301_sp25_be_de180212.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sba301.pe_sba301_sp25_be_de180212.entities.AccountMember;

import java.util.Optional;

@Repository
public interface AccountMemberRepository extends JpaRepository<AccountMember, String> {
    Optional<AccountMember> findByEmailAddress(String emailAddress);
}
