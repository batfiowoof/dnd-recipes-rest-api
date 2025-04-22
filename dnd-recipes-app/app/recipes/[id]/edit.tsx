import React, { useLayoutEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { TextInput, Button, Text, Menu, FAB, Portal } from "react-native-paper";
import { useNavigation } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";
import { useEditRecipeForm } from "@/hooks/useEditRecipeForm";

export default function EditRecipeScreen() {
  const navigation = useNavigation();
  const form = useEditRecipeForm();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit",
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#f0e6d2",
      headerTitleStyle: { fontWeight: "bold" },
    });
  }, [form.name]);

  return (
    <View style={themeStyles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[themeStyles.title, { marginBottom: 16 }]}>
          Editing {form.name}
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

        <Button
          mode="outlined"
          ref={form.difficultyButtonRef}
          onPress={() =>
            form.openMenu(
              form.difficultyButtonRef,
              form.setDifficultyAnchor,
              form.setDifficultyMenuVisible
            )
          }
          style={themeStyles.input}
          textColor="#f0e6d2"
        >
          Difficulty: {form.difficulty}
        </Button>
        <Menu
          visible={form.difficultyMenuVisible}
          onDismiss={() => form.setDifficultyMenuVisible(false)}
          anchor={form.difficultyAnchor}
        >
          {form.difficulties.map((level) => (
            <Menu.Item
              key={level}
              onPress={() => {
                form.setDifficulty(level);
                form.setDifficultyMenuVisible(false);
              }}
              title={level}
            />
          ))}
        </Menu>

        <Button
          mode="outlined"
          ref={form.categoryButtonRef}
          onPress={() =>
            form.openMenu(
              form.categoryButtonRef,
              form.setCategoryAnchor,
              form.setCategoryMenuVisible
            )
          }
          style={themeStyles.input}
          textColor="#f0e6d2"
        >
          Category: {form.categoryName || "Select"}
        </Button>
        <Menu
          visible={form.categoryMenuVisible}
          onDismiss={() => form.setCategoryMenuVisible(false)}
          anchor={form.categoryAnchor}
        >
          {form.categories.map((cat) => (
            <Menu.Item
              key={cat.id}
              onPress={() => {
                form.setCategoryName(cat.name);
                form.setCategoryMenuVisible(false);
              }}
              title={cat.name}
            />
          ))}
        </Menu>

        <Button
          mode="outlined"
          onPress={form.pickImage}
          style={themeStyles.input}
        >
          {form.image ? "Change Image" : "Pick New Image"}
        </Button>

        {(form.image?.uri || form.existingImageUrl) && (
          <Image
            source={{ uri: form.image?.uri || form.existingImageUrl }}
            style={styles.image}
          />
        )}
      </ScrollView>

      <Portal>
        <FAB
          icon="check"
          label="Save"
          onPress={form.handleSubmit}
          loading={form.submitting}
          disabled={form.submitting}
          style={[themeStyles.fab, styles.fab]}
          color="white"
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 100,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    zIndex: 99,
  },
});
