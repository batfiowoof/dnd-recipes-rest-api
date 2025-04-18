package com.dnd_recipe_api_server.recipes.entities;

import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String description;
    private String instructions;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    private String imageUrl;

    @ManyToOne
    private Category category;

    @ManyToMany
    private List<Ingredient> ingredients;
}

