import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface ErrorMessageProps {
  message: string;
  style?: object;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  style,
}) => {
  if (!message) return null;

  return (
    <View style={[styles.container, style]}>
      <ThemedText style={styles.message}>{message}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#ffebee",
    borderRadius: 4,
    marginVertical: 8,
  },
  message: {
    color: "#c62828",
    fontSize: 14,
  },
});
