import { create } from "zustand";
import axios from "axios";

type Recipe = {
  id: number;
  name: string;
  description: string;
  instructions: string;
  difficulty: string;
  imageUrl?: string;
  category?: { id: number; name: string };
  ingredients: { id: number; name: string }[];
};

type RecipeDetailState = {
  recipe: Recipe | null;
  loading: boolean;
  error: string | null;
  fetchRecipe: (id: string | number) => Promise<void>;
  clear: () => void;
};

export const useRecipeDetailStore = create<RecipeDetailState>((set) => ({
  recipe: null,
  loading: false,
  error: null,

  fetchRecipe: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `http://192.168.0.213:8080/api/recipes/${id}`
      );
      set({ recipe: res.data });
    } catch (err) {
      console.error("Error loading recipe", err);
      set({ error: "Failed to load recipe." });
    } finally {
      set({ loading: false });
    }
  },

  clear: () => set({ recipe: null, error: null }),
}));
