import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://192.168.0.213:8080/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error("Error loading recipe", err))
      .finally(() => setLoading(false));
  }, [id]);

  useLayoutEffect(() => {
    if (recipe?.name) {
      navigation.setOptions({ title: recipe.name });
    }
  }, [recipe?.name]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to DESINTEGRATE this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Desintegrate Recipe!",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.0.213:8080/api/recipes/${id}`);
              router.navigate("/recipes");
            } catch (err) {
              console.error("Failed to delete recipe", err);
            }
          },
        },
      ],
      { cancelable: true }
    );
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.tag}>Difficulty: {recipe.difficulty}</Text>
        <Text style={styles.tag}>Category: {recipe.category?.name}</Text>
      </View>

      {recipe.imageUrl && (
        <Image
          source={{ uri: recipe.imageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
      )}

      <Text style={styles.section}>Description</Text>
      <Text style={styles.text}>{recipe.description}</Text>

      <Text style={styles.section}>Instructions</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <>
          <Text style={styles.section}>Ingredients</Text>
          {recipe.ingredients.map((ing) => (
            <Text key={ing.id} style={styles.ingredient}>
              • {ing.name}
            </Text>
          ))}
        </>
      )}

      <Button
        mode="contained-tonal"
        title="Delete Recipe"
        onPress={handleDelete}
        style={styles.dangerButton}
        textColor="red"
      >
        Delete Recipe
      </Button>
    </ScrollView>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 14,
    color: "#444",
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  ingredient: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 4,
  },
  error: {
    marginTop: 100,
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
  dangerButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  dangerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
