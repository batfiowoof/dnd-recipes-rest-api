import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card as PaperCard } from "react-native-paper";
import { themeStyles } from "@/constants/themeStyles";

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
  contentStyle?: object;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  contentStyle,
}) => {
  const CardContent = (
    <PaperCard style={[themeStyles.card, styles.card, style]}>
      <PaperCard.Content style={contentStyle}>{children}</PaperCard.Content>
    </PaperCard>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{CardContent}</TouchableOpacity>;
  }

  return CardContent;
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
