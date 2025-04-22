import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import axios from "axios";
import { themeStyles } from "@/constants/themeStyles";

export default function CategoryRecipesScreen() {
  const { id } = useLocalSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`http://192.168.0.213:8080/api/recipes/category/${id}`)
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error("Failed to fetch recipes", err))
      .finally(() => setLoading(false));
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${id} Recipes`,
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: "#121212",
      },
      headerTintColor: "#f0e6d2",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={themeStyles.card}
      onPress={() => router.push(`/recipes/${item.id}`)}
    >
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={themeStyles.title}>{item.name}</Text>
          <Text style={themeStyles.subtitle}>
            Difficulty: {item.difficulty}
          </Text>
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

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={themeStyles.background}>
      {recipes.length === 0 ? (
        <Text style={styles.empty}>No recipes in this category.</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
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
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#aaa",
  },
});
