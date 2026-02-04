package sba301.a2trandinhduyphuong_se18d04.entities;

import jakarta.persistence.*;
import lombok.*;
import sba301.a2trandinhduyphuong_se18d04.entities.enumerations.CategoryStatus;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CategoryID")
    private Long categoryId;

    @Column(name = "CategoryName", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "CategoryDescription", length = 500)
    private String categoryDescription;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "IsActive")
    private CategoryStatus isActive;

    // Many categories can have the same parent category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentCategoryID", referencedColumnName = "CategoryID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Category parentCategory;

    // One category can have many child categories
    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Category> childCategories;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<NewsArticle> newsArticles;

}
