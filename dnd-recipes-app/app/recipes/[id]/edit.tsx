import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  UIManager,
  findNodeHandle,
  Image,
} from "react-native";
import { TextInput, Button, Text, Menu, FAB, Portal } from "react-native-paper";
import axios from "axios";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function EditRecipeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [difficultyMenuVisible, setDifficultyMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [difficultyAnchor, setDifficultyAnchor] = useState({ x: 0, y: 0 });
  const [categoryAnchor, setCategoryAnchor] = useState({ x: 0, y: 0 });

  const navigation = useNavigation();

  const difficultyButtonRef = useRef(null);
  const categoryButtonRef = useRef(null);

  const difficulties = ["EASY", "MEDIUM", "HARD", "LEGENDARY"];

  useEffect(() => {
    axios
      .get(`http://192.168.0.213:8080/api/recipes/${id}`)
      .then((res) => {
        const r = res.data;
        setName(r.name);
        setDescription(r.description);
        setInstructions(r.instructions);
        setDifficulty(r.difficulty);
        setCategoryName(r.category?.name);
        setExistingImageUrl(r.imageUrl);
      })
      .catch((err) => console.error("Failed to fetch recipe", err));

    axios
      .get("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Editing ${name}`,
    });
  }, [navigation]);

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

      await axios.put(`http://192.168.0.213:8080/api/recipes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.replace("/(tabs)/recipes");
    } catch (error) {
      console.error("Failed to update recipe", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge">Editing {name}</Text>

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
          {image ? "Change Image" : "Pick New Image"}
        </Button>

        {(image?.uri || existingImageUrl) && (
          <Image
            source={{ uri: image?.uri || existingImageUrl }}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        )}
      </ScrollView>

      <Portal>
        <FAB
          icon="check"
          label="Save"
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting}
          style={styles.fab}
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
  input: {
    backgroundColor: "white",
    marginBottom: 12,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#1976d2",
  },
});
