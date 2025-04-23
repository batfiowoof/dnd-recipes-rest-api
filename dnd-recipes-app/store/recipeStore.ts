// store/recipeStore.js
import { create } from "zustand";
import axios from "axios";
import { Recipe, recipeSchema } from "@/constants/schemas";

const API_BASE_URL = "http://192.168.0.213:8080/api";

interface RecipeStore {
  recipes: Recipe[];
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  setRecipes: (recipes: Recipe[]) => void;
  fetchRecipes: () => Promise<void>;
  fetchRecipe: (id: number) => Promise<void>;
  deleteRecipe: (id: number) => Promise<boolean>;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
  // Състояние
  recipes: [],
  recipe: null,
  loading: false,
  error: null,

  // Действия
  setRecipes: (recipes) => set({ recipes }),

  fetchRecipes: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/recipes`);
      const validatedData = response.data.map((recipe: unknown) =>
        recipeSchema.parse(recipe)
      );
      set({ recipes: validatedData, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching recipes", error);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchRecipe: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
      const validatedData = recipeSchema.parse(response.data);
      set({ recipe: validatedData, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching recipe", error);
      set({ error: errorMessage, loading: false });
    }
  },

  deleteRecipe: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/recipes/${id}`);
      set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id),
      }));
      return true;
    } catch (error) {
      console.error("Error deleting recipe", error);
      return false;
    }
  },
}));
