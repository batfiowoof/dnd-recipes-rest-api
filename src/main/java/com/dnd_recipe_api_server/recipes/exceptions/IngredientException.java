package com.dnd_recipe_api_server.recipes.exceptions;

import com.dnd_recipe_api_server.recipes.enums.IngredientErrors;
import lombok.Getter;

@Getter
public class IngredientException extends RuntimeException {

    private final IngredientErrors error;

    public IngredientException(IngredientErrors error) {
        super(error.getMessage());

        this.error = error;
    }
}
