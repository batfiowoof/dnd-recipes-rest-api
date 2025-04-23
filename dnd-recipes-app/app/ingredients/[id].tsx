import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { Loading } from "@/components/ui/Loading";
import { ThemedText } from "@/components/ThemedText";
import { useIngredientStore } from "@/store/ingredientStore";
import { useRecipeStore } from "@/store/recipeStore";
import type { Recipe } from "@/constants/schemas";

export default function IngredientDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const ingredientId = Number(id);

  const {
    ingredient,
    loading: ingredientLoading,
    fetchIngredient,
  } = useIngredientStore();
  const { recipes, loading: recipesLoading, fetchRecipes } = useRecipeStore();

  useEffect(() => {
    fetchIngredient(ingredientId);
    fetchRecipes();
  }, [ingredientId]);

  if (ingredientLoading || recipesLoading) {
    return <Loading />;
  }

  if (!ingredient) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.error}>
          The ingredient was not found in our mystical archives, traveler!
        </ThemedText>
      </View>
    );
  }

  const recipesWithIngredient = recipes.filter((recipe) =>
    recipe.ingredients?.some((ing) => ing.id === ingredientId)
  );

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <Card
      onPress={() => router.push(`/recipes/${item.id}`)}
      style={styles.recipeCard}
    >
      {item.imageUrl && <Image uri={item.imageUrl} style={styles.image} />}
      <View style={styles.content}>
        <ThemedText style={styles.title}>{item.name}</ThemedText>
        <ThemedText style={styles.difficulty}>
          Difficulty: {item.difficulty}
        </ThemedText>
        {item.category && (
          <ThemedText style={styles.category}>
            Category: {item.category.name}
          </ThemedText>
        )}
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.ingredientName}>{ingredient.name}</ThemedText>
        <ThemedText style={styles.recipeCount}>
          {recipesWithIngredient.length}{" "}
          {recipesWithIngredient.length === 1 ? "recipe" : "recipes"} found in
          our ancient tomes
        </ThemedText>
      </View>

      <FlatList
        data={recipesWithIngredient}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderRecipe}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  ingredientName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  recipeCount: {
    fontSize: 16,
    opacity: 0.7,
  },
  list: {
    padding: 16,
  },
  recipeCard: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  difficulty: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    opacity: 0.7,
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: 16,
  },
});
