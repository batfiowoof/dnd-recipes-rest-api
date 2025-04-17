package com.dnd_recipe_api_server.recipes.exceptions;

import com.dnd_recipe_api_server.recipes.enums.RecipeErrors;
import lombok.Getter;

@Getter
public class RecipeException extends RuntimeException {

    private final RecipeErrors error;

    public RecipeException(RecipeErrors error) {
        super(error.getMessage());
        this.error = error;
    }

}
