import { create } from "zustand";
import axios from "axios";
import { Ingredient, ingredientSchema } from "@/constants/schemas";
import { API_BASE_URL } from "@/constants/config";

interface IngredientStore {
  ingredients: Ingredient[];
  ingredient: Ingredient | null;
  loading: boolean;
  error: string | null;
  setIngredients: (ingredients: Ingredient[]) => void;
  fetchIngredients: () => Promise<void>;
  fetchIngredient: (id: number) => Promise<void>;
  deleteIngredient: (id: number) => Promise<boolean>;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [],
  ingredient: null,
  loading: false,
  error: null,

  setIngredients: (ingredients) => set({ ingredients }),

  fetchIngredients: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/ingredients`);
      const validatedData = response.data.map((ingredient: unknown) =>
        ingredientSchema.parse(ingredient)
      );
      set({ ingredients: validatedData, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching ingredients", error);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchIngredient: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/ingredients/${id}`);
      const validatedData = ingredientSchema.parse(response.data);
      set({ ingredient: validatedData, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching ingredient", error);
      set({ error: errorMessage, loading: false });
    }
  },

  deleteIngredient: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/ingredients/${id}`);
      set((state) => ({
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== id
        ),
      }));
      return true;
    } catch (error) {
      console.error("Error deleting ingredient", error);
      return false;
    }
  },
}));
