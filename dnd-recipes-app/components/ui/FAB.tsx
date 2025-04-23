import React from "react";
import { StyleSheet } from "react-native";
import { FAB as PaperFAB } from "react-native-paper";
import { themeStyles } from "@/constants/themeStyles";

interface FABProps {
  icon: string;
  label: string;
  onPress: () => void;
  style?: object;
}

export const FAB: React.FC<FABProps> = ({ icon, label, onPress, style }) => {
  return (
    <PaperFAB
      icon={icon}
      style={[themeStyles.fab, styles.fab, style]}
      onPress={onPress}
      label={label}
      color="#fff"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 32,
    zIndex: 99,
  },
});
