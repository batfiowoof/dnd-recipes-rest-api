import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

interface LoadingProps {
  style?: object;
}

export const Loading: React.FC<LoadingProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
