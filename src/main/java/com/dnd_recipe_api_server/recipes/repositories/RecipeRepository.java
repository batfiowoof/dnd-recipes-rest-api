package com.dnd_recipe_api_server.recipes.repositories;

import com.dnd_recipe_api_server.recipes.entities.Recipe;
import com.dnd_recipe_api_server.recipes.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    List<Recipe> findByDifficulty(Difficulty difficulty);

    @Query("SELECT r FROM Recipe r WHERE r.category.name = :name")
    List<Recipe> findByCategoryName(@Param("name") String name);

    //TODO add more methods to find recipes if needed
}
