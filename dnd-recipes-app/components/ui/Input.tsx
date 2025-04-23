import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: object;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry,
  multiline,
  numberOfLines,
  style,
}) => {
  return (
    <View style={styles.container}>
      <PaperInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[styles.input, style]}
        error={!!error}
      />
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "transparent",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
