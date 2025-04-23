import { create } from "zustand";
import axios from "axios";
import { Category, categorySchema } from "@/constants/schemas";

const API_BASE_URL = "http://192.168.0.213:8080/api";

interface CategoryStore {
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: string | null;
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  fetchCategory: (id: number) => Promise<void>;
  deleteCategory: (id: number) => Promise<boolean>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  category: null,
  loading: false,
  error: null,

  setCategories: (categories) => set({ categories }),

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      const validatedData = response.data.map((category: unknown) =>
        categorySchema.parse(category)
      );
      set({ categories: validatedData, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching categories", error);
      set({ error: errorMessage, loading: false });
    }
  },

  fetchCategory: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
      const validatedData = categorySchema.parse(response.data);
      set({ category: validatedData, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error fetching category", error);
      set({ error: errorMessage, loading: false });
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id),
      }));
      return true;
    } catch (error) {
      console.error("Error deleting category", error);
      return false;
    }
  },
}));
