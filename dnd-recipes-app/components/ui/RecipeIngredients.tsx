import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/ui/Card";
import type { Ingredient } from "@/constants/schemas";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

export const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
}) => {
  if (!ingredients || ingredients.length === 0) {
    return (
      <ThemedText style={styles.emptyText}>Няма добавени съставки</ThemedText>
    );
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Съставки:</ThemedText>
      {ingredients.map((ingredient) => (
        <Card key={ingredient.id} style={styles.ingredientCard}>
          <ThemedText style={styles.ingredientName}>
            {ingredient.name}
          </ThemedText>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredientCard: {
    marginBottom: 8,
    padding: 12,
  },
  ingredientName: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    opacity: 0.7,
  },
});
