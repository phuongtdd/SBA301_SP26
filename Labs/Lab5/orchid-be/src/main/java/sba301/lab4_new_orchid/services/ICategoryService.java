package sba301.lab4_new_orchid.services;

import sba301.lab4_new_orchid.pojos.Category;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
    public List<Category> getAllCategories();
    public Category insertCategory(Category category);
    public Category updateCategory(int categoryID, Category category);
    public void deleteCategory(int categoryID);
    public Optional<Category> getCategoryById(int categoryID);
}
