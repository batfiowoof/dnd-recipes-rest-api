import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card, ActivityIndicator, FAB } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";

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
      <Card style={[themeStyles.card, styles.card]}>
        <Card.Content>
          <Text style={themeStyles.title}>{item.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={themeStyles.background}>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <FAB
        icon="plus"
        label="Add Ingredient"
        style={[themeStyles.fab, styles.fab]}
        onPress={() => router.push("/ingredients/new")}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  fab: {
    position: "absolute",
    right: 16,
    bottom: 32,
    zIndex: 99,
  },
});
