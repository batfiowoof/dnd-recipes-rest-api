import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";

export default function IngredientDetailScreen() {
  const { id } = useLocalSearchParams();
  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`http://192.168.0.213:8080/api/ingredients/${id}`)
      .then((res) => setIngredient(res.data))
      .catch((err) => console.error("Error loading ingredient", err))
      .finally(() => setLoading(false));
  }, [id]);

  useLayoutEffect(() => {
    if (ingredient?.name) {
      navigation.setOptions({
        title: ingredient.name,
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#f0e6d2",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      });
    }
  }, [ingredient?.name]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  if (!ingredient) {
    return <Text style={styles.error}>Ingredient not found.</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={[themeStyles.background, styles.container]}
    >
      <Text style={themeStyles.title}>{ingredient.name}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  error: {
    marginTop: 100,
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
});
