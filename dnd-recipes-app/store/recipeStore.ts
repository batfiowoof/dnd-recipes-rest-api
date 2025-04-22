// store/recipeStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://192.168.0.213:8080/api";

export const useRecipeStore = create((set) => ({
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
      set({ recipes: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching recipes", error);
      set({ error: error.message, loading: false });
    }
  },

  fetchRecipe: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
      set({ recipe: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching recipe", error);
      set({ error: error.message, loading: false });
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
