package com.dnd_recipe_api_server.recipes.controllers;

import com.dnd_recipe_api_server.recipes.entities.Ingredient;
import com.dnd_recipe_api_server.recipes.services.IngredientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping
    public ResponseEntity<List<Ingredient>> findAll() {
        List<Ingredient> ingredients = ingredientService.findAll();
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> findById(@PathVariable int id) {
        Ingredient ingredient = ingredientService.findById(id);
        return ResponseEntity.ok(ingredient);
    }

    @PostMapping
    public ResponseEntity<Ingredient> createIngredient(Ingredient ingredient) {
        Ingredient createdIngredient = ingredientService.createIngredient(ingredient);
        return ResponseEntity.status(201).body(createdIngredient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable int id, @RequestBody Ingredient ingredient) {
        Ingredient updatedIngredient = ingredientService.updateIngredient(id, ingredient);
        return ResponseEntity.ok(updatedIngredient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable int id) {
        ingredientService.deleteIngredient(id);
        return ResponseEntity.noContent().build();
    }
}
