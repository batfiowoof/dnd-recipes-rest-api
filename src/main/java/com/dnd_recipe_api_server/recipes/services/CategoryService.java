package com.dnd_recipe_api_server.recipes.services;

import com.dnd_recipe_api_server.recipes.entities.Category;
import com.dnd_recipe_api_server.recipes.enums.CategoryErrors;
import com.dnd_recipe_api_server.recipes.exceptions.CategoryException;
import com.dnd_recipe_api_server.recipes.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(int id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryException(CategoryErrors.NOT_FOUND));
    }

    public Category createCategory(Category category) {
        if (categoryRepository.existsById(category.getId())) {
            throw new CategoryException(CategoryErrors.ALREADY_EXISTS);
        }
        return categoryRepository.save(category);
    }

    public Category updateCategory(int id, Category updateCategory) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryException(CategoryErrors.NOT_FOUND));
        category.setName(updateCategory.getName());
        return categoryRepository.save(category);
    }

    public void deleteCategory(int id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryException(CategoryErrors.NOT_FOUND);
        }
        categoryRepository.deleteById(id);
    }
}
