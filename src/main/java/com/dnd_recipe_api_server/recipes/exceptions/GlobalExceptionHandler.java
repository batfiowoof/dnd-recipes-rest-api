package com.dnd_recipe_api_server.recipes.exceptions;

import com.dnd_recipe_api_server.recipes.enums.CategoryErrors;
import com.dnd_recipe_api_server.recipes.enums.IngredientErrors;
import com.dnd_recipe_api_server.recipes.enums.RecipeErrors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecipeException.class)
    public ResponseEntity<ErrorResponse> handleRecipeException(RecipeException ex) {
        RecipeErrors errorType = ex.getError();

        ErrorResponse errorResponse = new ErrorResponse(
                errorType.getMessage(),
                errorType.getStatus()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(errorType.getStatus()));
    }

    @ExceptionHandler(IngredientException.class)
    public ResponseEntity<ErrorResponse> handleIngredientException(IngredientException ex) {
        IngredientErrors errorType = ex.getError();

        ErrorResponse errorResponse = new ErrorResponse(
                errorType.getMessage(),
                errorType.getStatus()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(errorType.getStatus()));
    }

    @ExceptionHandler(CategoryException.class)
    public ResponseEntity<ErrorResponse> handleCategoryException(CategoryException ex) {
        CategoryErrors errorType = ex.getError();

        ErrorResponse errorResponse = new ErrorResponse(
                errorType.getMessage(),
                errorType.getStatus()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(errorType.getStatus()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ex.printStackTrace();
        ErrorResponse errorResponse = new ErrorResponse("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR.value());

        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
