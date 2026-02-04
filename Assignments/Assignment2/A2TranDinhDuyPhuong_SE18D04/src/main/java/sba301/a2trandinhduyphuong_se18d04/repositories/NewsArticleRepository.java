package sba301.a2trandinhduyphuong_se18d04.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sba301.a2trandinhduyphuong_se18d04.entities.NewsArticle;
import sba301.a2trandinhduyphuong_se18d04.entities.enumerations.NewsStatus;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {

    List<NewsArticle> findByNewsStatus(NewsStatus status);

    List<NewsArticle> findByCreatedBy_AccountId(Long accountId);

    @Query("SELECT n FROM NewsArticle n WHERE " +
            "LOWER(n.newsTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(n.headline) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(n.newsContent) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<NewsArticle> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT COUNT(n) > 0 FROM NewsArticle n WHERE n.createdBy.accountId = :accountId")
    boolean existsByCreatedByAccountId(@Param("accountId") Long accountId);

    @Query("SELECT COUNT(n) > 0 FROM NewsArticle n WHERE n.category.categoryId = :categoryId")
    boolean existsByCategoryId(@Param("categoryId") Long categoryId);

}
