import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Button, ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { API_BASE_URL } from "@/constants/config";

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/recipes`)
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error("Failed to fetch recipes", err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/recipes/${item.id}`)}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>Difficulty: {item.difficulty}</Text>
        </View>
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Welcome to DnD Recipes!</Text>
        <Text style={styles.subheader}>
          Manage your fantasy cooking like a true alchemist.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          onPress={() => router.push("/recipes")}
          style={styles.button}
          textColor="white"
        >
          Browse Recipes
        </Button>
        <Button
          mode="outlined"
          onPress={() => router.push("/recipes/new")}
          style={styles.button}
          textColor="white"
        >
          Add New Recipe
        </Button>
      </View>

      <Text style={styles.section}>Recent Recipes</Text>

      {loading ? (
        <ActivityIndicator color="#b71c1c" />
      ) : (
        <FlatList
          data={recipes.slice(0, 3)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <Text style={styles.quote}>
        "Cooking is just another kind of spellcasting." — Chef Zoltar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#292525",
  },
  headerWrapper: {
    marginBottom: 24,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subheader: {
    textAlign: "center",
    marginTop: 4,
    color: "#ccc",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    borderColor: "#b71c1c",
    backgroundColor: "#b71c1c",
  },
  section: {
    color: "#ff5252",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
    borderColor: "#b71c1c",
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#b71c1c",
    borderWidth: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  quote: {
    marginTop: 24,
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },
});
