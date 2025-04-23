import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { Card } from "@/components/ui/Card";
import { FAB } from "@/components/ui/FAB";
import { Loading } from "@/components/ui/Loading";
import { ThemedText } from "@/components/ThemedText";
import axios from "axios";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardMargin = 12;
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

interface Category {
  id: number;
  name: string;
}

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }: { item: Category }) => (
    <Card
      onPress={() => router.push(`/categories/${item.name}`)}
      style={[styles.cardWrapper, { width: cardWidth }]}
      contentStyle={styles.cardContent}
    >
      <ThemedText
        style={[themeStyles.title, styles.title]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.name}
      </ThemedText>
    </Card>
  );

  if (loading) {
    return <Loading />;
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
        label="Add Category"
        onPress={() => router.push("/categories/new")}
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
  },
  cardContent: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
});
