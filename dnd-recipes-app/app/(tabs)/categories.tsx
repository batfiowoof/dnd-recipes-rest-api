import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, Card, FAB } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/categories/${item.name}`)}
      style={styles.cardWrapper}
    >
      <Card style={styles.card}>
        <Card.Title title={item.name} titleStyle={styles.title} />
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => router.push("/categories/new")}
        label="Add Category"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
  },
  list: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    elevation: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});
