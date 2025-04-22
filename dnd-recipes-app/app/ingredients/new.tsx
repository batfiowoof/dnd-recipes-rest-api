import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";
import { themeStyles } from "@/constants/themeStyles";

export default function NewIngredientScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "New Ingredient",
      headerBackTitle: "Back",
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#f0e6d2",
    });
  }, [navigation]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setLoading(true);
    try {
      await axios.post("http://192.168.0.213:8080/api/ingredients", { name });
      setSnackbarVisible(true);
      setTimeout(() => router.replace("/(tabs)/ingredients"), 1500);
    } catch (err) {
      console.error("Failed to create ingredient", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={themeStyles.background}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text variant="titleLarge" style={themeStyles.title}>
          What did you slay?
        </Text>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={themeStyles.input}
          theme={{
            colors: {
              primary: "#b30000",
              text: "#f0e6d2",
              placeholder: "#999",
              background: "#1e1e1e",
            },
          }}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={!name.trim() || loading}
          style={themeStyles.button}
          textColor="white"
        >
          Save
        </Button>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1500}
      >
        Ingredient created!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    gap: 16,
  },
});
