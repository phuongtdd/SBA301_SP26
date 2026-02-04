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
@Table(name = "Tag")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TagID")
    private Long tagId;

    @Column(name = "TagName", nullable = false, length = 100)
    private String tagName;

    @Column(name = "Note", length = 500)
    private String note;

    @ManyToMany(mappedBy = "tags")
    private List<NewsArticle> newsArticles;

}
