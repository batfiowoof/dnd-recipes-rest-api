import { create } from "zustand";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

type CategoryStore = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      const res = await axios.get("http://192.168.0.213:8080/api/categories");
      set({ categories: res.data });
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  },
}));
