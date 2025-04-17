package com.dnd_recipe_api_server.recipes.exceptions;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorResponse {

    private String message;
    private int status;
    private LocalDateTime timestamp;

    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

}
