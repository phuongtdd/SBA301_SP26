package sba301.a2trandinhduyphuong_se18d04.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "SystemAccount")
public class SystemAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "AccountID")
    private Long accountId;

    @Column(name = "AccountName", nullable = false, length = 100)
    private String accountName;

    @Column(name = "AccountEmail", nullable = false, unique = true, length = 150)
    private String accountEmail;

    @Column(name = "AccountRole", nullable = false)
    private Integer accountRole; // 1 = Admin, 2 = Staff

    @Column(name = "AccountPassword", nullable = false, length = 255)
    private String accountPassword;

    @OneToMany(mappedBy = "createdBy")
    private List<NewsArticle> createdNewsArticles;

}
