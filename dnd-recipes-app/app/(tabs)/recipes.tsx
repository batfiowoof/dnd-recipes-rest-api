import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { FAB } from "react-native-paper";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";

export default function RecipeListScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://192.168.0.213:8080/api/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => router.push(`/recipes/${item.id}`)}
    >
      <View style={themeStyles.card}>
        <Text style={themeStyles.title}>{item.name}</Text>
        <Text style={themeStyles.subtitle}>Difficulty: {item.difficulty}</Text>
        <Text style={themeStyles.text}>Category: {item.category?.name}</Text>

        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            resizeMode="cover"
            style={styles.image}
          />
        )}
      </View>
    </TouchableOpacity>
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
        style={[themeStyles.fab, styles.fab]}
        onPress={() => router.push("/recipes/new")}
        label="Add Recipe"
        color="#fff"
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
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    backgroundColor: "#000",
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 32,
    zIndex: 99,
  },
});
