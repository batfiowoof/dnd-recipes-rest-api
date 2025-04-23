import React from "react";
import { Image as RNImage, StyleSheet, ImageProps } from "react-native";

interface CustomImageProps extends Omit<ImageProps, "source"> {
  uri: string;
  style?: object;
}

export const Image: React.FC<CustomImageProps> = ({ uri, style, ...props }) => {
  return (
    <RNImage
      source={{ uri }}
      resizeMode="cover"
      style={[styles.image, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    backgroundColor: "#000",
    marginTop: 12,
  },
});
