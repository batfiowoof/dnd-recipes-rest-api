import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { Loading } from "@/components/ui/Loading";
import { ThemedText } from "@/components/ThemedText";
import { useCategoryStore } from "@/store/categoryStore";
import { useRecipeStore } from "@/store/recipeStore";
import type { Recipe } from "@/constants/schemas";

export default function CategoryDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const categoryId = Number(id);

  const {
    category,
    loading: categoryLoading,
    fetchCategory,
  } = useCategoryStore();
  const { recipes, loading: recipesLoading, fetchRecipes } = useRecipeStore();

  useEffect(() => {
    fetchCategory(categoryId);
    fetchRecipes();
  }, [categoryId]);

  if (categoryLoading || recipesLoading) {
    return <Loading />;
  }

  if (!category) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.error}>
          The category was not found in our mystical archives, traveler!
        </ThemedText>
      </View>
    );
  }

  const recipesInCategory = recipes.filter(
    (recipe) => recipe.category?.id === categoryId
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
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
        <ThemedText style={styles.recipeCount}>
          {recipesInCategory.length}{" "}
          {recipesInCategory.length === 1 ? "recipe" : "recipes"} found in this
          category, brave adventurer!
        </ThemedText>
      </View>

      <FlatList
        data={recipesInCategory}
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
  categoryName: {
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
  },
  error: {
    color: "red",
    textAlign: "center",
    margin: 16,
  },
});
