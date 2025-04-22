// hooks/useRecipeList.js
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useRecipeStore } from "@/store/recipeStore";

export const useRecipeList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const { recipes, fetchRecipes, loading, error } = useRecipeStore((state) => ({
    recipes: state.recipes,
    fetchRecipes: state.fetchRecipes,
    loading: state.loading,
    error: state.error,
  }));

  useFocusEffect(
    useCallback(() => {
      fetchRecipes();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes();
    setRefreshing(false);
  };

  const navigateToDetail = (id) => {
    router.push(`/recipes/${id}`);
  };

  const navigateToCreate = () => {
    router.push("/recipes/new");
  };

  return {
    recipes,
    loading,
    error,
    refreshing,
    handleRefresh,
    navigateToDetail,
    navigateToCreate,
  };
};
