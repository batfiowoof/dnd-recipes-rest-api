package com.dnd_recipe_api_server.recipes.exceptions;

import com.dnd_recipe_api_server.recipes.enums.CategoryErrors;
import lombok.Getter;

@Getter
public class CategoryException extends RuntimeException {

  private final CategoryErrors error;

    public CategoryException(CategoryErrors error) {
        super(error.getMessage());

        this.error = error;
    }
}
