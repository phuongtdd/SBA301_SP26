package sba301.a2trandinhduyphuong_se18d04.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sba301.a2trandinhduyphuong_se18d04.dtos.request.CategoryRequest;
import sba301.a2trandinhduyphuong_se18d04.dtos.response.CategoryResponse;
import sba301.a2trandinhduyphuong_se18d04.entities.Category;
import sba301.a2trandinhduyphuong_se18d04.entities.enumerations.CategoryStatus;
import sba301.a2trandinhduyphuong_se18d04.repositories.CategoryRepository;
import sba301.a2trandinhduyphuong_se18d04.repositories.NewsArticleRepository;
import sba301.a2trandinhduyphuong_se18d04.services.CategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final NewsArticleRepository newsArticleRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return mapToResponse(category);
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = new Category();
        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDescription());

        // Handle OneToOne parentCategory relationship
        if (request.getParentCategoryId() != null) {
            Category parentCategory = categoryRepository.findById(request.getParentCategoryId())
                    .orElseThrow(() -> new RuntimeException(
                            "Parent category not found with id: " + request.getParentCategoryId()));
            category.setParentCategory(parentCategory);
        } else {
            category.setParentCategory(null);
        }

        category.setIsActive(request.getIsActive() ? CategoryStatus.ACTIVE : CategoryStatus.INACTIVE);

        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        category.setCategoryName(request.getCategoryName());
        category.setCategoryDescription(request.getCategoryDescription());

        // Handle OneToOne parentCategory relationship
        if (request.getParentCategoryId() != null) {
            Category parentCategory = categoryRepository.findById(request.getParentCategoryId())
                    .orElseThrow(() -> new RuntimeException(
                            "Parent category not found with id: " + request.getParentCategoryId()));
            category.setParentCategory(parentCategory);
        } else {
            category.setParentCategory(null);
        }

        category.setIsActive(request.getIsActive() ? CategoryStatus.ACTIVE : CategoryStatus.INACTIVE);

        Category saved = categoryRepository.save(category);
        return mapToResponse(saved);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

        // Check if category has any news articles
        if (newsArticleRepository.existsByCategoryId(id)) {
            throw new RuntimeException("Cannot delete category. This category contains news articles.");
        }

        categoryRepository.delete(category);
    }

    @Override
    public List<CategoryResponse> searchCategories(String keyword) {
        return categoryRepository.searchByKeyword(keyword).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .categoryDescription(category.getCategoryDescription())
                .parentCategoryId(
                        category.getParentCategory() != null ? category.getParentCategory().getCategoryId() : null)
                .isActive(category.getIsActive() == CategoryStatus.ACTIVE)
                .build();
    }

}
