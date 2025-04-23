import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar as PaperSnackbar } from "react-native-paper";
import { useTheme } from "@/hooks/useTheme";

interface SnackbarProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  duration?: number;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  onDismiss,
  action,
  duration = 3000,
}) => {
  const { colors } = useTheme();

  return (
    <PaperSnackbar
      visible={visible}
      onDismiss={onDismiss}
      action={action}
      duration={duration}
      style={[styles.snackbar, { backgroundColor: colors.card }]}
      theme={{ colors: { surface: colors.text } }}
    >
      {message}
    </PaperSnackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
