// hooks/useNewRecipeForm.ts
import { useEffect, useRef, useState } from "react";
import { UIManager, findNodeHandle } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export function useNewRecipeForm(router: any) {
  // state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>(
    []
  );
  const [image, setImage] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD", "LEGENDARY"];

  // menu states
  const [difficultyMenuVisible, setDifficultyMenuVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [ingredientsMenuVisible, setIngredientsMenuVisible] = useState(false);

  const [difficultyAnchor, setDifficultyAnchor] = useState({ x: 0, y: 0 });
  const [categoryAnchor, setCategoryAnchor] = useState({ x: 0, y: 0 });
  const [ingredientsAnchor, setIngredientsAnchor] = useState({ x: 0, y: 0 });

  // refs
  const difficultyButtonRef = useRef(null);
  const categoryButtonRef = useRef(null);
  const ingredientsButtonRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);

    axios
      .get("http://192.168.0.213:8080/api/ingredients")
      .then((res) => setIngredients(res.data))
      .catch(console.error);
  }, []);

  const toggleIngredient = (id: number) => {
    setSelectedIngredientIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openMenu = (
    ref: any,
    setAnchor: (pos: { x: number; y: number }) => void,
    setVisible: (v: boolean) => void
  ) => {
    const node = findNodeHandle(ref.current);
    if (node) {
      UIManager.measureInWindow(node, (x, y, width, height) => {
        setAnchor({ x, y: y + height });
        setVisible(true);
      });
    }
  };

  const openDifficultyMenu = () =>
    openMenu(
      difficultyButtonRef,
      setDifficultyAnchor,
      setDifficultyMenuVisible
    );

  const openCategoryMenu = () =>
    openMenu(categoryButtonRef, setCategoryAnchor, setCategoryMenuVisible);

  const openIngredientsMenu = () =>
    openMenu(
      ingredientsButtonRef,
      setIngredientsAnchor,
      setIngredientsMenuVisible
    );

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

  const selectDifficulty = (level: string) => {
    setDifficulty(level);
    setDifficultyMenuVisible(false);
  };

  const selectCategory = (id: number) => {
    setCategoryId(id);
    setCategoryMenuVisible(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const recipe = {
        name,
        description,
        instructions,
        difficulty,
        category: categoryId ? { id: categoryId } : null,
        ingredients: selectedIngredientIds.map((id) => ({ id })),
      };

      const formData = new FormData();
      formData.append("recipe", {
        string: JSON.stringify(recipe),
        type: "application/json",
        name: "recipe.json",
      } as any);

      if (image) {
        formData.append("file", {
          uri: image.uri,
          type: "image/jpeg",
          name: "recipe.jpg",
        } as any);
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

  return {
    // values
    name,
    description,
    instructions,
    difficulty,
    categoryId,
    categories,
    ingredients,
    selectedIngredientIds,
    image,
    snackbarVisible,
    submitting,
    difficulties,

    // refs
    difficultyButtonRef,
    categoryButtonRef,
    ingredientsButtonRef,

    // menus
    difficultyMenuVisible,
    categoryMenuVisible,
    ingredientsMenuVisible,
    difficultyAnchor,
    categoryAnchor,
    ingredientsAnchor,

    // setters
    setName,
    setDescription,
    setInstructions,
    setDifficultyMenuVisible,
    setCategoryMenuVisible,
    setIngredientsMenuVisible,
    setSnackbarVisible,

    // actions
    setCategoryId,
    toggleIngredient,
    handleSubmit,
    pickImage,
    selectDifficulty,
    selectCategory,
    openDifficultyMenu,
    openCategoryMenu,
    openIngredientsMenu,
  };
}
