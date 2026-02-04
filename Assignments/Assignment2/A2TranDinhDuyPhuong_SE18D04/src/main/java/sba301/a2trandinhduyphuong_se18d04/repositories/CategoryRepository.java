package sba301.a2trandinhduyphuong_se18d04.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sba301.a2trandinhduyphuong_se18d04.entities.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE " +
            "LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(c.categoryDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Category> searchByKeyword(@Param("keyword") String keyword);

    boolean existsByCategoryName(String categoryName);

}
