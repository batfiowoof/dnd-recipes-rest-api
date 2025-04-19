import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  UIManager,
  findNodeHandle,
  Image,
} from "react-native";
import { TextInput, Button, Text, Menu } from "react-native-paper";
import axios from "axios";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function NewRecipeScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [difficultyMenuVisible, setDifficultyMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [difficultyAnchor, setDifficultyAnchor] = useState({ x: 0, y: 0 });
  const [categoryAnchor, setCategoryAnchor] = useState({ x: 0, y: 0 });

  const difficultyButtonRef = useRef(null);
  const categoryButtonRef = useRef(null);

  const difficulties = ["EASY", "MEDIUM", "HARD"];

  useEffect(() => {
    axios
      .get("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

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
      formData.append("recipe", {
        string: JSON.stringify({
          name,
          description,
          instructions,
          difficulty,
          categoryName,
        }),
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.back();
    } catch (error) {
      console.error("Failed to create recipe", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge">Create New Recipe</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <TextInput
        label="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <View>
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
          style={styles.input}
        >
          Difficulty: {difficulty}
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
      </View>

      <View>
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
          style={styles.input}
        >
          Category: {categoryName || "Select"}
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
                setCategoryName(cat.name);
                setCategoryMenuVisible(false);
              }}
              title={cat.name}
            />
          ))}
        </Menu>
      </View>

      <Button mode="outlined" onPress={pickImage} style={styles.input}>
        {image ? "Change Image" : "Pick Image"}
      </Button>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: "100%", height: 200, borderRadius: 8, marginTop: 10 }}
        />
      )}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={submitting}
        disabled={submitting}
        style={styles.submit}
      >
        Save Recipe
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 12,
  },
  submit: {
    marginTop: 20,
  },
});
