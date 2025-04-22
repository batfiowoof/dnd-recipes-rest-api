import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  UIManager,
  findNodeHandle,
  Image,
} from "react-native";
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
import axios from "axios";
import { useRouter, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { themeStyles } from "@/constants/themeStyles";

export default function NewRecipeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);
  const [image, setImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [categoryAnchor, setCategoryAnchor] = useState({ x: 0, y: 0 });
  const categoryButtonRef = useRef(null);

  const [ingredientsMenuVisible, setIngredientsMenuVisible] = useState(false);
  const [ingredientsAnchor, setIngredientsAnchor] = useState({ x: 0, y: 0 });
  const ingredientsButtonRef = useRef(null);

  const [difficultyMenuVisible, setDifficultyMenuVisible] = useState(false);
  const [difficultyAnchor, setDifficultyAnchor] = useState({ x: 0, y: 0 });
  const difficultyButtonRef = useRef(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const difficulties = ["EASY", "MEDIUM", "HARD", "LEGENDARY"];

  useEffect(() => {
    axios
      .get("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));

    axios
      .get("http://192.168.0.213:8080/api/ingredients")
      .then((res) => setIngredients(res.data))
      .catch((err) => console.error("Failed to fetch ingredients", err));
  }, []);

  const toggleIngredient = (id) => {
    setSelectedIngredientIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openMenu = (ref, setAnchor, setVisible) => {
    const node = findNodeHandle(ref.current);
    if (node) {
      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        setAnchor({ x: pageX + width - 150, y: pageY + height });
        setVisible(true);
      });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formData = new FormData();

      const recipe = {
        name,
        description,
        instructions,
        difficulty,
        category: categoryId ? { id: categoryId } : null,
        ingredients: selectedIngredientIds.map((id) => ({ id })),
      };

      formData.append("recipe", {
        string: JSON.stringify(recipe),
        type: "application/json",
        name: "recipe.json",
      });

      if (image) {
        formData.append("file", {
          uri: image.uri,
          type: "image/jpeg",
          name: "recipe.jpg",
        });
      }

      await axios.post("http://192.168.0.213:8080/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbarVisible(true);
      setTimeout(() => router.replace("/(tabs)/recipes"), 1500);
    } catch (err) {
      console.error("Failed to create recipe", err);
    } finally {
      setSubmitting(false);
    }
  };

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
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={themeStyles.input}
        />

        <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          style={themeStyles.input}
        />

        <TextInput
          label="Instructions"
          value={instructions}
          onChangeText={setInstructions}
          mode="outlined"
          multiline
          style={themeStyles.input}
        />

        <Text style={themeStyles.subtitle}>Difficulty</Text>
        <Button
          mode="outlined"
          ref={difficultyButtonRef}
          onPress={() =>
            openMenu(
              difficultyButtonRef,
              setDifficultyAnchor,
              setDifficultyMenuVisible
            )
          }
          style={themeStyles.input}
        >
          {difficulty}
        </Button>
        <Menu
          visible={difficultyMenuVisible}
          onDismiss={() => setDifficultyMenuVisible(false)}
          anchor={difficultyAnchor}
        >
          {difficulties.map((level) => (
            <Menu.Item
              key={level}
              onPress={() => {
                setDifficulty(level);
                setDifficultyMenuVisible(false);
              }}
              title={level}
            />
          ))}
        </Menu>

        <Text style={themeStyles.subtitle}>Category</Text>
        <Button
          mode="outlined"
          ref={categoryButtonRef}
          onPress={() =>
            openMenu(
              categoryButtonRef,
              setCategoryAnchor,
              setCategoryMenuVisible
            )
          }
          style={themeStyles.input}
        >
          {categoryId ? `Category ID: ${categoryId}` : "Select Category"}
        </Button>
        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={categoryAnchor}
        >
          {categories.map((cat) => (
            <Menu.Item
              key={cat.id}
              onPress={() => {
                setCategoryId(cat.id);
                setCategoryMenuVisible(false);
              }}
              title={cat.name}
            />
          ))}
        </Menu>

        <Text style={themeStyles.subtitle}>Ingredients</Text>
        <Button
          mode="outlined"
          ref={ingredientsButtonRef}
          onPress={() =>
            openMenu(
              ingredientsButtonRef,
              setIngredientsAnchor,
              setIngredientsMenuVisible
            )
          }
          style={themeStyles.input}
        >
          {selectedIngredientIds.length > 0
            ? `${selectedIngredientIds.length} selected`
            : "Select Ingredients"}
        </Button>
        <Menu
          visible={ingredientsMenuVisible}
          onDismiss={() => setIngredientsMenuVisible(false)}
          anchor={ingredientsAnchor}
        >
          {ingredients.map((ing) => (
            <Menu.Item
              key={ing.id}
              onPress={() => toggleIngredient(ing.id)}
              title={
                <View style={styles.menuItemRow}>
                  <Checkbox
                    status={
                      selectedIngredientIds.includes(ing.id)
                        ? "checked"
                        : "unchecked"
                    }
                  />
                  <Text style={themeStyles.text}>{ing.name}</Text>
                </View>
              }
            />
          ))}
        </Menu>

        <Button mode="outlined" onPress={pickImage} style={themeStyles.input}>
          {image ? "Change Image" : "Pick Image"}
        </Button>

        {image?.uri && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        )}
      </ScrollView>

      <Portal>
        <FAB
          icon="check"
          label="Submit"
          style={[themeStyles.fab, styles.fab]}
          onPress={handleSubmit}
          loading={submitting}
        />
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
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
