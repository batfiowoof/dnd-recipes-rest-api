package com.dnd_recipe_api_server.recipes.controllers;

import com.dnd_recipe_api_server.recipes.dto.RecipeDTO;
import com.dnd_recipe_api_server.recipes.entities.Recipe;
import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import com.dnd_recipe_api_server.recipes.enums.RecipeErrors;
import com.dnd_recipe_api_server.recipes.exceptions.RecipeException;
import com.dnd_recipe_api_server.recipes.services.CloudinaryService;
import com.dnd_recipe_api_server.recipes.services.RecipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:3000}")
@Tag(name = "Recipe Controller", description = "APIs for managing recipes")
public class RecipeController {

    private final RecipeService recipeService;
    private final CloudinaryService cloudinaryService;

    public RecipeController(RecipeService recipeService, CloudinaryService cloudinaryService) {
        this.recipeService = recipeService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    @Operation(summary = "Get all recipes", description = "Retrieves a list of all recipes")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = this.recipeService.findAll();
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get recipe by ID", description = "Retrieves a specific recipe by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved the recipe")
    @ApiResponse(responseCode = "404", description = "Recipe not found")
    public ResponseEntity<Recipe> getRecipe(@Parameter(description = "ID of the recipe") @PathVariable int id) {
        Recipe recipe = this.recipeService.findById(id);
        return ResponseEntity.ok(recipe);
    }

//    @GetMapping("/exception")
//    public void testException() {
//        throw new RecipeException(RecipeErrors.RECIPE_NOT_FOUND);
//    }

    @PostMapping
    @Operation(summary = "Create a new recipe", description = "Creates a new recipe with optional image")
    @ApiResponse(responseCode = "201", description = "Recipe successfully created")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public ResponseEntity<Recipe> createRecipe(
            @Parameter(description = "Recipe data") @Valid @RequestPart("recipe") RecipeDTO recipeDTO,
            @Parameter(description = "Recipe image") @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Recipe recipe = new Recipe();
        recipe.setName(recipeDTO.getName());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setDifficulty(recipeDTO.getDifficulty());
        
        if (file != null && !file.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(file);
            recipe.setImageUrl(imageUrl);
        }

        Recipe createdRecipe = this.recipeService.createRecipe(recipe);
        return ResponseEntity.status(201).body(createdRecipe);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a recipe", description = "Updates an existing recipe with optional image")
    @ApiResponse(responseCode = "200", description = "Recipe successfully updated")
    @ApiResponse(responseCode = "404", description = "Recipe not found")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public ResponseEntity<Recipe> updateRecipe(
            @Parameter(description = "ID of the recipe") @PathVariable int id,
            @Parameter(description = "Updated recipe data") @Valid @RequestPart("recipe") RecipeDTO recipeDTO,
            @Parameter(description = "New recipe image") @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Recipe recipe = new Recipe();
        recipe.setName(recipeDTO.getName());
        recipe.setDescription(recipeDTO.getDescription());
        recipe.setInstructions(recipeDTO.getInstructions());
        recipe.setDifficulty(recipeDTO.getDifficulty());
        
        if (file != null && !file.isEmpty()) {
            String imageUrl = this.cloudinaryService.uploadImage(file);
            recipe.setImageUrl(imageUrl);
        }

        Recipe updatedRecipe = this.recipeService.updateRecipe(id, recipe);
        return ResponseEntity.ok(updatedRecipe);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a recipe", description = "Deletes a recipe by its ID")
    @ApiResponse(responseCode = "204", description = "Recipe successfully deleted")
    @ApiResponse(responseCode = "404", description = "Recipe not found")
    public ResponseEntity<Void> deleteRecipe(@Parameter(description = "ID of the recipe") @PathVariable int id) {
        this.recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/difficulty/{difficulty}")
    @Operation(summary = "Get recipes by difficulty", description = "Retrieves all recipes of a specific difficulty level")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved recipes")
    @ApiResponse(responseCode = "400", description = "Invalid difficulty level")
    public ResponseEntity<List<Recipe>> getRecipesByDifficulty(
            @Parameter(description = "Difficulty level") @PathVariable String difficulty) {
        try {
            Difficulty.valueOf(difficulty);
        } catch (IllegalArgumentException e) {
            throw new RecipeException(RecipeErrors.INVALID_DIFFICULTY);
        }
        List<Recipe> recipes = this.recipeService.findByDifficulty(Difficulty.valueOf(difficulty));
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Get recipes by category", description = "Retrieves all recipes in a specific category")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved recipes")
    public ResponseEntity<List<Recipe>> getRecipesByCategory(
            @Parameter(description = "Category name") @PathVariable String category) {
        List<Recipe> recipes = this.recipeService.findByCategory(category);
        return ResponseEntity.ok(recipes);
    }

    @PostMapping("/{id}/image")
    @Operation(summary = "Upload recipe image", description = "Uploads an image for an existing recipe")
    @ApiResponse(responseCode = "200", description = "Image successfully uploaded")
    @ApiResponse(responseCode = "404", description = "Recipe not found")
    public ResponseEntity<Recipe> uploadImage(
            @Parameter(description = "ID of the recipe") @PathVariable int id,
            @Parameter(description = "Image file") @RequestParam("file") MultipartFile file) throws IOException {
        Recipe recipe = this.recipeService.findById(id);
        String imageUrl = this.cloudinaryService.uploadImage(file);
        recipe.setImageUrl(imageUrl);
        Recipe updatedRecipe = this.recipeService.updateRecipe(id, recipe);
        return ResponseEntity.ok(updatedRecipe);
    }
}
