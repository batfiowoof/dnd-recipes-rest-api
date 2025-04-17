package com.dnd_recipe_api_server.recipes.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum IngredientErrors {

    INGREDIENT_EXISTS("Ingredient already exists",409),
    INGREDIENT_NOT_FOUND("Ingredient not found",404),
    INGREDIENT_INVALID_DATA("Invalid ingredient data",400);

    private final String message;
    private final int status;
}
