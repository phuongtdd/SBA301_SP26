package sba301.lab4_new_orchid.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sba301.lab4_new_orchid.pojos.Category;
import sba301.lab4_new_orchid.repositories.ICategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category insertCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int categoryID, Category category) {
        Category c = categoryRepository.findById(categoryID).orElse(null);
        if (c == null) {
            return null;
        }
        c.setName(category.getName());
        c.setOrchids(category.getOrchids());
        return categoryRepository.save(c);
    }

    @Override
    public void deleteCategory(int categoryID) {
        categoryRepository.deleteById(categoryID);
    }

    @Override
    public Optional<Category> getCategoryById(int categoryID) {
        Category c = categoryRepository.findById(categoryID).orElse(null);
        return Optional.ofNullable(c);
    }
}
