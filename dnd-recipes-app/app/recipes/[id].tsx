import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Dialog, Portal, Paragraph } from "react-native-paper";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { useRecipeStore } from "@/store/recipeStore";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  // Използваме Zustand
  const recipe = useRecipeStore((state) => state.recipe);
  const loading = useRecipeStore((state) => state.loading);
  const fetchRecipe = useRecipeStore((state) => state.fetchRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  useLayoutEffect(() => {
    if (recipe?.name) {
      navigation.setOptions({
        title: recipe.name,
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#f0e6d2",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      });
    }
  }, [recipe?.name]);

  const handleDeleteConfirm = async () => {
    const success = await deleteRecipe(id);
    if (success) {
      router.navigate("/recipes");
    }
    setDialogVisible(false);
  };

  const handleEdit = () => {
    router.push(`/recipes/${id}/edit`);
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!recipe) {
    return <Text style={styles.error}>Recipe not found.</Text>;
  }

  return (
    <View style={themeStyles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[themeStyles.title, { marginBottom: 20 }]}>
          {recipe.name}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.tag}>Difficulty: {recipe.difficulty}</Text>
          <Text
            style={styles.tag}
            onPress={() => router.push(`/categories/${recipe.category?.name}`)}
          >
            Category: {recipe.category?.name}
          </Text>
        </View>

        {recipe.imageUrl && (
          <Image
            source={{ uri: recipe.imageUrl }}
            resizeMode="cover"
            style={styles.image}
          />
        )}

        <Text style={themeStyles.subtitle}>Description</Text>
        <Text style={themeStyles.text}>{recipe.description}</Text>

        <Text style={themeStyles.subtitle}>Instructions</Text>
        <Text style={themeStyles.text}>{recipe.instructions}</Text>

        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <>
            <Text style={themeStyles.subtitle}>Ingredients</Text>
            {recipe.ingredients.map((ing) => (
              <Text key={ing.id} style={themeStyles.text}>
                • {ing.name}
              </Text>
            ))}
          </>
        )}

        <Button
          icon={"trash-can"}
          mode="contained"
          onPress={() => setDialogVisible(true)}
          style={[themeStyles.button, { marginTop: 40 }]}
          textColor="white"
        >
          Delete Recipe
        </Button>

        <Button
          icon={"pencil"}
          mode="contained"
          onPress={handleEdit}
          style={[
            themeStyles.button,
            { marginTop: 16, backgroundColor: "#6200ee" },
          ]}
          textColor="white"
        >
          Edit Recipe
        </Button>

        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
            style={themeStyles.card}
          >
            <Dialog.Title style={themeStyles.title}>
              Desintegrate Recipe
            </Dialog.Title>
            <Dialog.Content>
              <Paragraph style={themeStyles.text}>
                Are you sure you want to permanently remove this arcane
                creation?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)} textColor="#aaa">
                Cancel
              </Button>
              <Button onPress={handleDeleteConfirm} textColor="#EE4B2B">
                Desintegrate!
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#400000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
    color: "#fef4e8",
  },
  error: {
    marginTop: 100,
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
});
