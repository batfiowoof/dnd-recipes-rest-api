import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/ui/Card";
import type { Ingredient } from "@/constants/schemas";

interface IngredientListProps {
  ingredients: Ingredient[];
  style?: object;
}

export const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  style,
}) => {
  if (ingredients.length === 0) {
    return (
      <ThemedText style={styles.emptyText}>Няма добавени съставки</ThemedText>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {ingredients.map((ingredient) => (
        <Card key={ingredient.id} style={styles.ingredientCard}>
          <View style={styles.ingredientContent}>
            <ThemedText style={styles.ingredientName}>
              {ingredient.name}
            </ThemedText>
            <ThemedText style={styles.ingredientAmount}>
              {ingredient.amount} {ingredient.unit}
            </ThemedText>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  ingredientCard: {
    marginBottom: 8,
  },
  ingredientContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "500",
  },
  ingredientAmount: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    opacity: 0.7,
  },
});
