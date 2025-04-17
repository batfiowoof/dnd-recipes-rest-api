package com.dnd_recipe_api_server.recipes.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryErrors {

    NOT_FOUND("Category not found",404),
    ALREADY_EXISTS("Category already exists", 409),
    INVALID_DATA("Invalid data", 400);

    private final String message;
    private final int status;
}
