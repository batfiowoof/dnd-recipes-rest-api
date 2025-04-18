package com.dnd_recipe_api_server.recipes.controllers;

import com.dnd_recipe_api_server.recipes.exceptions.RecipeException;
import com.dnd_recipe_api_server.recipes.entities.Recipe;
import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import com.dnd_recipe_api_server.recipes.enums.RecipeErrors;
import com.dnd_recipe_api_server.recipes.services.CloudinaryService;
import com.dnd_recipe_api_server.recipes.services.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    private final RecipeService recipeService;
    private final CloudinaryService cloudinaryService;

    public RecipeController(RecipeService recipeService, CloudinaryService cloudinaryService) {
        this.recipeService = recipeService;
        this.cloudinaryService = cloudinaryService;
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

//    @GetMapping("/exception")
//    public void testException() {
//        throw new RecipeException(RecipeErrors.RECIPE_NOT_FOUND);
//    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestPart("recipe") Recipe recipe, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException{ {
        if (file != null && !file.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(file);
            recipe.setImageUrl(imageUrl);
        }

        Recipe createdRecipe = recipeService.createRecipe(recipe);
        return ResponseEntity.status(201).body(createdRecipe);
    }
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

    @PostMapping("/{id}/image")
    public ResponseEntity<Recipe> uploadImage(@PathVariable int id, @RequestParam("file") MultipartFile file) throws IOException {
        Recipe recipe = recipeService.findById(id);
        String imageUrl = cloudinaryService.uploadImage(file);
        recipe.setImageUrl(imageUrl);
        Recipe updatedRecipe = recipeService.updateRecipe(id, recipe);
        return ResponseEntity.ok(updatedRecipe);
    }
}
