import { useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";

export default function NewCategoryScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await axios.post("http://192.168.0.213:8080/api/categories", { name });
      setSnackbarVisible(true);
      setTimeout(() => router.replace("/(tabs)/categories"), 1500);
    } catch (err) {
      console.error("Failed to create category", err);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Category",
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: "#6200ee",
      },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Create Category
      </Text>

      <TextInput
        label="Category Name"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading || !name.trim()}
      >
        Submit
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1500}
      >
        Category created!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
});
