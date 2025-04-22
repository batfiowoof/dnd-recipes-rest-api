import { useEffect, useState, useRef } from "react";
import { UIManager, findNodeHandle } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRecipeStore } from "@/store/recipeStore";
import axios from "axios";

export function useEditRecipeForm() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const difficulties = ["EASY", "MEDIUM", "HARD", "LEGENDARY"];

  const [difficultyMenuVisible, setDifficultyMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [difficultyAnchor, setDifficultyAnchor] = useState({ x: 0, y: 0 });
  const [categoryAnchor, setCategoryAnchor] = useState({ x: 0, y: 0 });

  const difficultyButtonRef = useRef(null);
  const categoryButtonRef = useRef(null);

  const { fetchRecipe } = useRecipeStore();

  useEffect(() => {
    if (id) {
      fetchRecipe(id).then(() => {
        axios.get(`http://192.168.0.213:8080/api/recipes/${id}`).then((res) => {
          const r = res.data;
          setName(r.name);
          setDescription(r.description);
          setInstructions(r.instructions);
          setDifficulty(r.difficulty);
          setCategoryName(r.category?.name || "");
          setExistingImageUrl(r.imageUrl || "");
        });
      });

      axios
        .get("http://192.168.0.213:8080/api/categories")
        .then((res) => setCategories(res.data))
        .catch((err) => console.error("Failed to fetch categories", err));
    }
  }, [id]);

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
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.replace("/(tabs)/recipes");
    } catch (err) {
      console.error("Failed to update recipe", err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    name,
    description,
    instructions,
    difficulty,
    categoryName,
    image,
    existingImageUrl,
    categories,
    submitting,
    difficulties,

    setName,
    setDescription,
    setInstructions,
    setDifficulty,
    setCategoryName,
    pickImage,
    handleSubmit,

    // Menu state & refs
    difficultyMenuVisible,
    setDifficultyMenuVisible,
    categoryMenuVisible,
    setCategoryMenuVisible,
    difficultyAnchor,
    setDifficultyAnchor,
    categoryAnchor,
    setCategoryAnchor,
    difficultyButtonRef,
    categoryButtonRef,
    openMenu,
  };
}
