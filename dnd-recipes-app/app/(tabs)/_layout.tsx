import { Tabs } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ff4444",
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveBackgroundColor: "#1e1e1e",
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "#b30000",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          title: "Ingredients",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shop" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
