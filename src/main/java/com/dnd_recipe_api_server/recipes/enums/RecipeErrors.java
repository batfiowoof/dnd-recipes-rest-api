package com.dnd_recipe_api_server.recipes.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RecipeErrors {

    RECIPE_NOT_FOUND("Recipe not found", 404),
    RECIPE_ALREADY_EXISTS("Recipe already exists", 409),
    INVALID_DATA("Invalid data", 400),
    INVALID_DIFFICULTY("Invalid difficulty", 400);

    private final String message;
    private final int status;
}
