export interface Category {
  id: number;
  name: string;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface RecipeDTO {
  name: string;
  description: string;
  instructions: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "LEGENDARY";
  imageUrl?: string;
}

export interface Recipe extends RecipeDTO {
  id: number;
  category?: Category;
  ingredients?: Ingredient[];
}
