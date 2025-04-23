package com.dnd_recipe_api_server.recipes.dto;

import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RecipeDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotBlank(message = "Instructions are required")
    @Size(min = 20, max = 5000, message = "Instructions must be between 20 and 5000 characters")
    private String instructions;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    private String imageUrl;
} 