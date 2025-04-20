import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, ActivityIndicator, Card } from "react-native-paper";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";

export default function IngredientDetailScreen() {
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`http://192.168.0.213:8080/api/ingredients/${id}`)
      .then((res) => setIngredient(res.data))
      .catch((err) => console.error("Failed to fetch ingredient", err))
      .finally(() => setLoading(false));
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Ingredients",
      headerStyle: { backgroundColor: "#6200ee" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!ingredient) {
    return <Text style={styles.error}>Ingredient not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{ingredient.name}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    marginTop: 100,
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
});
