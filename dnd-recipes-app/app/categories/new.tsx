import { useState, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";

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
        backgroundColor: "#121212",
      },
      headerTintColor: "#f0e6d2",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  return (
    <View style={themeStyles.background}>
      <View style={styles.form}>
        <Text variant="titleLarge" style={[themeStyles.title, styles.title]}>
          Create Category
        </Text>

        <TextInput
          label="Category Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={themeStyles.input}
          textColor="white"
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !name.trim()}
          style={[themeStyles.button, { marginTop: 16 }]}
          textColor="white"
        >
          Submit
        </Button>
      </View>

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
  form: {
    padding: 20,
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
});
