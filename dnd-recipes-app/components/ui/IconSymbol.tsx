import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Entypo } from "@expo/vector-icons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// Mapping for MaterialIcons
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "book.fill": "book",
  "shop.fill": "shop",
  "folder.fill": "folder",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as const;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: string; // <-- променено, за да хваща грешки при неправилен вход
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName = MAPPING[name as IconSymbolName];

  if (!mappedName) {
    console.warn(
      `⚠️ IconSymbol: "${name}" is not in the MAPPING. Using fallback icon.`
    );
    return (
      <MaterialIcons
        name="help-outline"
        size={size}
        color={color}
        style={style}
      />
    );
  }

  return (
    <MaterialIcons name={mappedName} size={size} color={color} style={style} />
  );
}

export function EntypoSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  if (!name || !(name in Entypo.glyphMap)) {
    console.warn(
      `⚠️ EntypoSymbol: "${name}" is not a valid Entypo icon. Using fallback.`
    );
    return (
      <Entypo
        name="help" // fallback икона
        size={size}
        color={color}
        style={style}
      />
    );
  }

  return <Entypo name={name} size={size} color={color} style={style} />;
}
