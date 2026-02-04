package sba301.a2trandinhduyphuong_se18d04.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import sba301.a2trandinhduyphuong_se18d04.entities.enumerations.NewsStatus;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "NewsArticle")
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "NewsArticleID")
    private Long newsArticleId;

    @Column(name = "NewsTitle", nullable = false, length = 200)
    private String newsTitle;

    @Column(name = "Headline", length = 300)
    private String headline;

    @CreatedDate
    @Column(name = "CreatedDate", updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "NewsContent", columnDefinition = "NVARCHAR(MAX)")
    private String newsContent;

    @Column(name = "NewsSource", length = 255)
    private String newsSource;

    @ManyToOne
    @JoinColumn(name = "CategoryID")
    private Category category;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "NewsStatus")
    private NewsStatus newsStatus;

    @ManyToOne
    @JoinColumn(name = "CreatedByID")
    private SystemAccount createdBy;

    @ManyToOne
    @JoinColumn(name = "UpdatedByID")
    private SystemAccount updatedBy;

    @LastModifiedDate
    @Column(name = "ModifiedDate")
    private LocalDateTime modifiedDate;

    @ManyToMany
    @JoinTable(name = "NewsTag", joinColumns = @JoinColumn(name = "NewsArticleID"), inverseJoinColumns = @JoinColumn(name = "TagID"))
    private List<Tag> tags;

}
