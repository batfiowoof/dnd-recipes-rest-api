package com.dnd_recipe_api_server.recipes.repositories;

import com.dnd_recipe_api_server.recipes.entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {

    //TODO add more methods to find ingredients if needed

}
