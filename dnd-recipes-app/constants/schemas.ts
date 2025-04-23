import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "Name is required, adventurer!")
    .max(50, "Name must be shorter than 50 characters, lest it be too mighty!"),
});

export const ingredientSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "The ingredient's name is required, brave alchemist!"),
});

export const recipeSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "Name is required, master chef!")
    .max(
      100,
      "Name must be shorter than 100 characters, lest it be too legendary!"
    ),
  difficulty: z.string().min(1, "Difficulty is required, mighty warrior!"),
  category: categorySchema.optional(),
  imageUrl: z.string().url("Invalid URL, traveler!").optional(),
  ingredients: z.array(ingredientSchema).optional(),
  instructions: z
    .string()
    .min(1, "Instructions are required, wise sage!")
    .optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type Recipe = z.infer<typeof recipeSchema>;
