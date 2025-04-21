import { StyleSheet } from "react-native";

export const themeStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#121212",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: "#b30000",
    borderWidth: 1,
  },
  text: {
    color: "#f0e6d2",
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f0e6d2",
  },
  subtitle: {
    fontSize: 14,
    color: "#ff4444",
  },
  button: {
    backgroundColor: "#b30000",
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#f0e6d2",
  },
  fab: {
    backgroundColor: "#b30000",
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#444",
    marginVertical: 10,
  },
});
