import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card, ActivityIndicator, FAB } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";

export default function IngredientsScreen() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://192.168.0.213:8080/api/ingredients")
      .then((res) => setIngredients(res.data))
      .catch((err) => console.error("Failed to fetch ingredients", err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/ingredients/${item.id}`)}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">{item.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        label="Add Ingredient"
        style={{ position: "absolute", bottom: 16, right: 16 }}
        onPress={() => router.push("/ingredients/new")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    marginTop: 40,
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
});
