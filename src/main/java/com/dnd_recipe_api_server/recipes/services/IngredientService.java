package com.dnd_recipe_api_server.recipes.services;

import com.dnd_recipe_api_server.recipes.entities.Ingredient;
import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import com.dnd_recipe_api_server.recipes.enums.IngredientErrors;
import com.dnd_recipe_api_server.recipes.exceptions.IngredientException;
import com.dnd_recipe_api_server.recipes.repositories.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    public Ingredient findById(int id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new IngredientException(IngredientErrors.INGREDIENT_NOT_FOUND));
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        try {
            return ingredientRepository.save(ingredient);
        } catch (Exception e) {
            throw new IngredientException(IngredientErrors.INGREDIENT_EXISTS);
        }
    }

    public Ingredient updateIngredient(int id, Ingredient updateIngredient) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new IngredientException(IngredientErrors.INGREDIENT_NOT_FOUND));
        ingredient.setName(updateIngredient.getName());
        return ingredientRepository.save(ingredient);
    }

    public void deleteIngredient(int id) {
        try {
            ingredientRepository.deleteById(id);
        } catch (Exception e) {
            throw new IngredientException(IngredientErrors.INGREDIENT_NOT_FOUND);
        }
    }
}
