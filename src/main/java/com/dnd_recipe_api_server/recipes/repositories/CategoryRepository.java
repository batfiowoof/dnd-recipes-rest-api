package com.dnd_recipe_api_server.recipes.repositories;

import com.dnd_recipe_api_server.recipes.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    //TODO: Implement more methods for category repository if needed

}
