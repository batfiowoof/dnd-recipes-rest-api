// hooks/useRecipeDetail.js
import { useEffect, useLayoutEffect } from "react";
import { useRecipeStore } from "@/store/recipeStore";
import { useRouter, useNavigation } from "expo-router";

export const useRecipeDetail = (id) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { recipe, loading, error, fetchRecipe, deleteRecipe, resetState } =
    useRecipeStore();

  useEffect(() => {
    // Fetch recipe when component mounts or id changes
    if (id) {
      fetchRecipe(id);
    }

    // Clean up state when component unmounts
    return () => resetState();
  }, [id]);

  useLayoutEffect(() => {
    // Update navigation header when recipe name changes
    if (recipe?.name) {
      navigation.setOptions({
        title: recipe.name,
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#f0e6d2",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      });
    }
  }, [recipe?.name, navigation]);

  const handleDelete = async () => {
    if (!id) return false;

    const success = await deleteRecipe(id);
    if (success) {
      router.navigate("/recipes");
    }
    return success;
  };

  const navigateToEdit = () => {
    router.push(`/recipes/${id}/edit`);
  };

  const navigateToCategory = (categoryName) => {
    if (categoryName) {
      router.push(`/categories/${categoryName}`);
    }
  };

  return {
    recipe,
    loading,
    error,
    handleDelete,
    navigateToEdit,
    navigateToCategory,
  };
};
