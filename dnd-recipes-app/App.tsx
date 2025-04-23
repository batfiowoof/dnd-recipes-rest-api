import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { SnackbarProvider } from "@/context/SnackbarContext";
import Navigation from "@/navigation";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SnackbarProvider>
          <Navigation />
          <StatusBar style={isDark ? "light" : "dark"} />
        </SnackbarProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
