import { Tabs } from "expo-router";
import { View } from "react-native";
import { PortfolioHeader } from "../../components/PortfolioHeader";

export default function PortfolioLayout() {
  return (
    <View style={{ flex: 1 }}>
      <PortfolioHeader />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#212529" },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#adb5bd",
        }}
      >
        <Tabs.Screen
          name="hobbies"
          options={{ title: "Hobbies", tabBarLabel: "🎯 Hobbies" }}
        />
        <Tabs.Screen
          name="qr"
          options={{ title: "QR Repo", tabBarLabel: "📱 Mi Repo" }}
        />
      </Tabs>
    </View>
  );
}