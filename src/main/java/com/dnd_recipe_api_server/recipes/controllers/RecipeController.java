package com.dnd_recipe_api_server.recipes.controllers;

import com.dnd_recipe_api_server.recipes.exceptions.RecipeException;
import com.dnd_recipe_api_server.recipes.entities.Recipe;
import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import com.dnd_recipe_api_server.recipes.enums.RecipeErrors;
import com.dnd_recipe_api_server.recipes.services.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeService.findAll();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipe(@PathVariable int id) {
        Recipe recipe = recipeService.findById(id);
        return ResponseEntity.ok(recipe);
    }

    @GetMapping("/exception")
    public void testException() {
        throw new RecipeException(RecipeErrors.RECIPE_NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        Recipe createdRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.status(201).body(createdRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable int id, @RequestBody Recipe recipe) {
        Recipe updatedRecipe = recipeService.updateRecipe(id, recipe);
        return ResponseEntity.ok(updatedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable int id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Recipe>> getRecipesByDifficulty(@PathVariable String difficulty) {
        try {
            Difficulty.valueOf(difficulty);
        } catch (IllegalArgumentException e) {
            throw new RecipeException(RecipeErrors.INVALID_DIFFICULTY);
        }
        List<Recipe> recipes = recipeService.findByDifficulty(Difficulty.valueOf(difficulty));
        return ResponseEntity.ok(recipes);
    }
}
