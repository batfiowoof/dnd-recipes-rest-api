import { create } from "zustand";
import axios from "axios";

type Ingredient = {
  id: number;
  name: string;
};

type IngredientStore = {
  ingredients: Ingredient[];
  fetchIngredients: () => Promise<void>;
};

export const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [],
  fetchIngredients: async () => {
    try {
      const res = await axios.get("http://192.168.0.213:8080/api/ingredients");
      set({ ingredients: res.data });
    } catch (err) {
      console.error("Failed to fetch ingredients", err);
    }
  },
}));
