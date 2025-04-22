import React, { useLayoutEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Menu,
  Snackbar,
  FAB,
  Portal,
  Checkbox,
} from "react-native-paper";
import { useNavigation, useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { useNewRecipeForm } from "@/hooks/useNewRecipeForm";

export default function NewRecipeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const form = useNewRecipeForm(router);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "New Recipe",
      headerBackTitle: "Back",
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#f0e6d2",
    });
  }, [navigation]);

  return (
    <View style={themeStyles.background}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text variant="titleLarge" style={themeStyles.title}>
          What are we cooking?
        </Text>

        <TextInput
          label="Name"
          textColor="white"
          value={form.name}
          onChangeText={form.setName}
          mode="outlined"
          style={themeStyles.input}
        />

        <TextInput
          label="Description"
          textColor="white"
          value={form.description}
          onChangeText={form.setDescription}
          mode="outlined"
          multiline
          style={themeStyles.input}
        />

        <TextInput
          label="Instructions"
          textColor="white"
          value={form.instructions}
          onChangeText={form.setInstructions}
          mode="outlined"
          multiline
          style={themeStyles.input}
        />

        <Text style={themeStyles.subtitle}>Difficulty</Text>
        <Button
          mode="outlined"
          ref={form.difficultyButtonRef}
          onPress={form.openDifficultyMenu}
          style={themeStyles.input}
        >
          {form.difficulty}
        </Button>
        <Menu
          visible={form.difficultyMenuVisible}
          onDismiss={() => form.setDifficultyMenuVisible(false)}
          anchor={form.difficultyAnchor}
        >
          {form.difficulties.map((level) => (
            <Menu.Item
              key={level}
              onPress={() => form.selectDifficulty(level)}
              title={level}
            />
          ))}
        </Menu>

        <Text style={themeStyles.subtitle}>Category</Text>
        <Button
          mode="outlined"
          ref={form.categoryButtonRef}
          onPress={form.openCategoryMenu}
          style={themeStyles.input}
        >
          {form.categoryId
            ? `Selected: ${
                form.categories.find((cat) => cat.id === form.categoryId)?.name
              }`
            : "Select Category"}
        </Button>
        <Menu
          visible={form.categoryMenuVisible}
          onDismiss={() => form.setCategoryMenuVisible(false)}
          anchor={form.categoryAnchor}
        >
          {form.categories.map((cat) => (
            <Menu.Item
              key={cat.id}
              onPress={() => form.selectCategory(cat.id)}
              title={cat.name}
            />
          ))}
        </Menu>

        <Text style={themeStyles.subtitle}>Ingredients</Text>
        <Button
          mode="outlined"
          ref={form.ingredientsButtonRef}
          onPress={form.openIngredientsMenu}
          style={themeStyles.input}
        >
          {form.selectedIngredientIds.length > 0
            ? `${form.selectedIngredientIds.length} selected`
            : "Select Ingredients"}
        </Button>
        <Menu
          visible={form.ingredientsMenuVisible}
          onDismiss={() => form.setIngredientsMenuVisible(false)}
          anchor={form.ingredientsAnchor}
        >
          {form.ingredients.map((ing) => (
            <Menu.Item
              key={ing.id}
              onPress={() => form.toggleIngredient(ing.id)}
              title={
                <View style={styles.menuItemRow}>
                  <Checkbox
                    status={
                      form.selectedIngredientIds.includes(ing.id)
                        ? "checked"
                        : "unchecked"
                    }
                  />
                  <Text>{ing.name}</Text>
                </View>
              }
            />
          ))}
        </Menu>

        <Button
          mode="outlined"
          onPress={form.pickImage}
          style={themeStyles.input}
        >
          {form.image ? "Change Image" : "Pick Image"}
        </Button>

        {form.image?.uri && (
          <Image
            source={{ uri: form.image.uri }}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        )}
      </ScrollView>

      <Portal>
        <FAB
          icon="check"
          label="Submit"
          color="white"
          style={[themeStyles.fab, styles.fab]}
          onPress={form.handleSubmit}
          loading={form.submitting}
        />
      </Portal>

      <Snackbar
        visible={form.snackbarVisible}
        onDismiss={() => form.setSnackbarVisible(false)}
        duration={1500}
      >
        Recipe created!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    gap: 16,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
