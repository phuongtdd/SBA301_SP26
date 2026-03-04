package sba301.pe_sba301_sp25_be_de180212.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "AccountMember")
public class AccountMember {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "member_id")
    private String memberId;

    @Column(name = "member_password")
    private String memberPassword;

    @Column(name = "email_address")
    private String emailAddress;

    @Column(name = "memeber_role")
    private Integer memberRole;
}
