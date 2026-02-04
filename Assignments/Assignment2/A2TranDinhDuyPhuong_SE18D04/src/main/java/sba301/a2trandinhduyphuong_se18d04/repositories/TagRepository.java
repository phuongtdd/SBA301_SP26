package sba301.a2trandinhduyphuong_se18d04.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sba301.a2trandinhduyphuong_se18d04.entities.Tag;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("SELECT t FROM Tag t WHERE " +
            "LOWER(t.tagName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(t.note) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Tag> searchByKeyword(@Param("keyword") String keyword);

    boolean existsByTagName(String tagName);

}
