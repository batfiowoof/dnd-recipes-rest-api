import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text, ActivityIndicator, Card, FAB } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardMargin = 12;
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

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
      <Card style={[themeStyles.card, styles.card]}>
        <Card.Content>
          <Text
            style={themeStyles.title}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={themeStyles.background}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
      />

      <FAB
        icon="plus"
        style={[themeStyles.fab, styles.fab]}
        onPress={() => router.push("/categories/new")}
        label="Add Category"
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: cardMargin,
    marginTop: 40,
  },
  cardWrapper: {
    margin: cardMargin / 2,
    width: cardWidth,
  },
  card: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 99,
  },
  title: {
    textAlign: "center",
  },
});
