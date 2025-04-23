import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { useCategoryStore } from "@/store/categoryStore";
import { Card } from "@/components/ui/Card";
import { FAB } from "@/components/ui/FAB";
import { Loading } from "@/components/ui/Loading";
import { ThemedText } from "@/components/ThemedText";
import type { Category } from "@/constants/schemas";

export default function CategoryListScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const categories = useCategoryStore((state) => state.categories);
  const loading = useCategoryStore((state) => state.loading);
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  };

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({ item }: { item: Category }) => (
    <Card
      onPress={() => router.push(`/categories/${item.id}`)}
      style={styles.itemWrapper}
    >
      <ThemedText style={themeStyles.title}>{item.name}</ThemedText>
    </Card>
  );

  return (
    <View style={themeStyles.background}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />

      <FAB
        icon="plus"
        label="Add New Category"
        onPress={() => router.push("/categories/new")}
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
});
