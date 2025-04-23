import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "Името е задължително")
    .max(50, "Името трябва да е по-кратко от 50 символа"),
});

export const ingredientSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Името на съставката е задължително"),
});

export const recipeSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(1, "Името е задължително")
    .max(100, "Името трябва да е по-кратко от 100 символа"),
  difficulty: z.string().min(1, "Трудността е задължителна"),
  category: categorySchema.optional(),
  imageUrl: z.string().url("Невалиден URL адрес").optional(),
  ingredients: z.array(ingredientSchema).optional(),
  instructions: z.string().min(1, "Инструкциите са задължителни").optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;
export type Recipe = z.infer<typeof recipeSchema>;
