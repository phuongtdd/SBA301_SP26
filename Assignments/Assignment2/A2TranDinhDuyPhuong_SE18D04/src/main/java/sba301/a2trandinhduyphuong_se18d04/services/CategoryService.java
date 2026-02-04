package sba301.a2trandinhduyphuong_se18d04.services;

import sba301.a2trandinhduyphuong_se18d04.dtos.request.CategoryRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse createCategory(CategoryRequest request);

    CategoryResponse updateCategory(Long id, CategoryRequest request);

    void deleteCategory(Long id);

    List<CategoryResponse> searchCategories(String keyword);

}
