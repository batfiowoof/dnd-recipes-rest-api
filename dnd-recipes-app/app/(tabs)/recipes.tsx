import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { useRecipeStore } from "@/store/recipeStore";
import { Card } from "@/components/ui/Card";
import { FAB } from "@/components/ui/FAB";
import { Image } from "@/components/ui/Image";
import { ThemedText } from "@/components/ThemedText";
import type { Recipe } from "@/constants/schemas";

export default function RecipeListScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const recipes = useRecipeStore((state) => state.recipes);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);

  useFocusEffect(
    useCallback(() => {
      fetchRecipes();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes();
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: Recipe }) => (
    <Card
      onPress={() => router.push(`/recipes/${item.id}`)}
      style={styles.itemWrapper}
    >
      <ThemedText style={themeStyles.title}>{item.name}</ThemedText>
      <ThemedText style={themeStyles.subtitle}>
        Difficulty: {item.difficulty}
      </ThemedText>
      <ThemedText style={themeStyles.text}>
        Category: {item.category?.name}
      </ThemedText>

      {item.imageUrl && <Image uri={item.imageUrl} />}
    </Card>
  );

  return (
    <View style={themeStyles.background}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      <FAB
        icon="plus"
        label="Add New Recipe"
        onPress={() => router.push("/recipes/new")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    marginTop: 40,
  },
  itemWrapper: {
    marginBottom: 16,
  },
});
