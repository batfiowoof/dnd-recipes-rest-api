package com.dnd_recipe_api_server.recipes.services;

import com.dnd_recipe_api_server.recipes.exceptions.RecipeException;
import com.dnd_recipe_api_server.recipes.entities.Recipe;
import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import com.dnd_recipe_api_server.recipes.enums.RecipeErrors;
import com.dnd_recipe_api_server.recipes.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> findAll() {
        return recipeRepository.findAll();
    }

    public Recipe findById(int id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RecipeException(RecipeErrors.RECIPE_NOT_FOUND));
    }

    public Recipe createRecipe(Recipe recipe) {
        try {
            return recipeRepository.save(recipe);
        } catch (Exception e) {
            throw new RecipeException(RecipeErrors.RECIPE_ALREADY_EXISTS);
        }
    }

    public Recipe updateRecipe(int id, Recipe updateRecipe){
            Recipe recipe = recipeRepository.findById(id)
                    .orElseThrow(() -> new RecipeException(RecipeErrors.RECIPE_NOT_FOUND));
        recipe.setName(updateRecipe.getName());
        recipe.setDescription(updateRecipe.getDescription());
        recipe.setInstructions(updateRecipe.getInstructions());
        recipe.setDifficulty(updateRecipe.getDifficulty());
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(int id) {
        try{
            recipeRepository.deleteById(id);
        } catch (Exception e) {
            throw new RecipeException(RecipeErrors.RECIPE_NOT_FOUND);
        }
    }

    public List<Recipe> findByDifficulty(Difficulty difficulty) {
        return recipeRepository.findByDifficulty(difficulty);
    }

    public List<Recipe> findByCategory(String category) {
        return recipeRepository.findByCategoryName(category);
    }
}
