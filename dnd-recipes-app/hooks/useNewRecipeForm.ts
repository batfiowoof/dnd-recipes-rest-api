// hooks/useNewRecipeForm.ts
import { useEffect, useRef, useState } from "react";
import { UIManager, findNodeHandle } from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { RecipeDTO, Category, Ingredient } from "@/types/recipe";

export function useNewRecipeForm(router: any) {
  // state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [difficulty, setDifficulty] = useState<RecipeDTO["difficulty"]>("EASY");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>(
    []
  );
  const [image, setImage] = useState<any>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // difficulties
  const difficulties: RecipeDTO["difficulty"][] = [
    "EASY",
    "MEDIUM",
    "HARD",
    "LEGENDARY",
  ];

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
      .get<Category[]>("http://192.168.0.213:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);

    axios
      .get<Ingredient[]>("http://192.168.0.213:8080/api/ingredients")
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

  const selectDifficulty = (level: RecipeDTO["difficulty"]) => {
    setDifficulty(level);
    setDifficultyMenuVisible(false);
  };

  const selectCategory = (id: number) => {
    setCategoryId(id);
    setCategoryMenuVisible(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors({});
    try {
      const recipeDTO: RecipeDTO = {
        name,
        description,
        instructions,
        difficulty,
      };

      const formData = new FormData();
      formData.append("recipe", JSON.stringify(recipeDTO));

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

      setSnackbarMessage("Recipe created successfully!");
      setSnackbarVisible(true);
      setTimeout(() => router.replace("/(tabs)/recipes"), 1500);
    } catch (err: any) {
      if (err.response?.data) {
        if (typeof err.response.data === "object") {
          setErrors(err.response.data);
          setSnackbarMessage("Please fix the validation errors");
        } else {
          setSnackbarMessage(
            err.response.data.error || "Failed to create recipe"
          );
        }
      } else {
        setSnackbarMessage("An unexpected error occurred");
      }
      setSnackbarVisible(true);
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
    snackbarMessage,
    submitting,
    difficulties,
    errors,

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
